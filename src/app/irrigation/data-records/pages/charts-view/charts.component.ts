import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Color, NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {ArduinoIotService} from "../../services/arduino-iot";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {ZonesService} from "../../../../devices/services/zones.service";
import {MatButton} from "@angular/material/button";
import {Subject} from "rxjs";
import {SensorDataRecordsService} from "../../services/sensor-data-records.service";


@Component({
  selector: 'charts-view',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule, MatButtonToggleGroup, MatButtonToggle, MatButton],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit{
  selectedOption: string = 'general';
  zones: any;
  dateSelectedOption: string = "today";
  dateFilter = [
    "today",
    "last week",
    "last month",
  ]
  moistureChart: any;
  waterUsageChart: any;
  humidityChart: any;
  temperatureChart: any;

  view: [number, number] = [500, 300];
  // options
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  timeline: boolean = true;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  constructor(
    private zoneService: ZonesService,
    private sensorService: SensorDataRecordsService)
  { }

  ngOnInit() {
    this.loadZones();
  }
  loadZones(): void {
    this.zoneService.getAll().subscribe((zones: any) => {
      this.zones = [{ id: 0, name: 'general'}, ...zones];
      this.getFilteredSensorData();
    });
  }

  getFilteredSensorData(){
    const zoneId = this.zones.find((zone:any):any => zone.name.toLowerCase() === this.selectedOption.toLowerCase()).id;
    const startDate = this.getStartDateByFilter(this.dateSelectedOption);
    this.sensorService.getSensorDataRecord(startDate.toISOString(), undefined, zoneId)
      .subscribe((dataRecords: any) => {
        console.log('dataRecords', dataRecords);
        // Agrupar los registros por 'typeSensor' y fecha
        const groupedData = this.groupDataBySensorTypeAndDate(dataRecords);

        // Calcular el promedio de los valores para cada fecha y tipo de sensor
        const sensorData = this.calculateAverageValues(groupedData);

        console.log("sensorData", sensorData);
        this.updateCharts(sensorData);

        console.log("sensor de moistureChart", this.moistureChart);
        console.log("sensor de waterUsageChart", this.waterUsageChart);
        console.log("sensor de temperatureChart", this.temperatureChart);
        console.log("sensor de humidityChart", this.humidityChart);
    });

  }
  getStartDateByFilter(dateFilter: string): Date {
    const currentDate = new Date();
    let resultDate: Date;

    switch (dateFilter.toLowerCase()) {
      case 'today':
        resultDate = new Date(currentDate);  // Clona el objeto original
        resultDate.setHours(0, 0, 0, 0);     // Establece el inicio del día
        return resultDate;

      case 'last week':
        resultDate = new Date(currentDate);  // Clona el objeto original
        resultDate.setDate(resultDate.getDate() - 7);  // Restar 7 días
        resultDate.setHours(0, 0, 0, 0);     // Establece el inicio del día
        return resultDate;

      case 'last month':
        resultDate = new Date(currentDate);  // Clona el objeto original
        resultDate.setMonth(resultDate.getMonth() - 1);  // Restar un mes
        resultDate.setHours(0, 0, 0, 0);     // Establece el inicio del día
        return resultDate;

      default:
        resultDate = new Date(currentDate);  // Clona el objeto original
        resultDate.setHours(23, 59, 59, 999); // Establece el fin del día
        return resultDate;
    }
  }

  groupDataBySensorTypeAndDate(dataRecords: any){
    return dataRecords.reduce((acc: any, record: any) => {
      const date = new Date(record.createdAt);
      const sensorType = record.typeSensor;
      let dateString = date.toISOString().split('T')[0] + " " + date.toISOString().split('T')[1].substring(0,5);
      dateString = dateString.substring(6);

      if (!acc[sensorType]) acc[sensorType] = {};
      if (!acc[sensorType][dateString]) acc[sensorType][dateString] = [];

      acc[sensorType][dateString].push(record.lastValue);
      return acc;
    },  {});
  }

  private calculateAverageValues(groupedData: any): any[] {
    return Object.keys(groupedData).map(sensorType => ({
      name: sensorType,
      series: Object.keys(groupedData[sensorType]).map(date => ({
        name: date,
        value: groupedData[sensorType][date].reduce((sum: number, val: number) => sum + val, 0) / groupedData[sensorType][date].length,
      })),
    }));
  }

  private updateCharts(sensorData: any): void {
    this.moistureChart = this.findSensorData(sensorData, 'SENSOR DE HUMEDAD');
    this.waterUsageChart = this.findSensorData(sensorData, 'SENSOR DE CAUDAL');
    this.temperatureChart = this.findSensorData(sensorData, 'SENSOR DE TEMPERATURA');
    this.humidityChart = this.findSensorData(sensorData, 'SENSOR DE HUMEDAD DEL AIRE');
  }

  private findSensorData(sensorData: any[], sensorName: string): any[] | undefined {
    return [sensorData.find(item => item.name === sensorName)] || undefined;
  }

}
