import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Color, NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {multi} from "../../model/LineChartData";
import {ArduinoIotService} from "../../services/arduino-iot";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {ZoneService} from "../../services/zone.service";
import {MatButton} from "@angular/material/button";
import {Subject} from "rxjs";
import {SensorService} from "../../services/sensor.service";


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
  templateUrl: './plost-view.component.html',
  styleUrl: './plost-view.component.css'
})
export class PlostViewComponent implements OnInit{
  selectedOption: string = 'general';
  zones: any;
  dateSelectedOption: string = "hoy";
  dateFilter = [
    "hoy",
    "1 semana",
    "1 mes",
  ]
  private readonly TEMPERATURE_SENSOR: string = "SENSOR DE TEMPERATURA";
  private readonly CAUDAL_SENSOR: string = "SENSOR DE CAUDAL";
  private readonly MOISTURE_SENSOR: string = "SENSOR DE HUMEDAD";
  private readonly HUMIDITY_SENSOR: string = "SENSOR DE HUMEDAD RELATIVA";
  dataRecordsSubject: Subject<any> = new Subject();
  moistureChart: any;
  waterUsageChart: any;
  humidityChart: any;
  temperatureChart: any;


  // humedad del suelo line chart
  view: [number, number] = [500, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo';
  yAxisLabel: string = 'Consumo de Agua';
  timeline: boolean = true;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  constructor(private zoneService: ZoneService, private sensorService: SensorService) {
    // Object.assign(this, { multi });
    this.dataRecordsSubject.subscribe()
  }

  ngOnInit() {
    this.zoneService.getZones().subscribe((zones: any) => {
      zones.unshift({name: 'general'})
      this.zones = zones;
    })
    this.getSensorDataRecordFiltered();
  }

  applyChanges(){
    this.getSensorDataRecordFiltered();
  }
  getSensorDataRecordFiltered(){
    let zoneId = this.selectedOption.toLowerCase() === 'parcela 1'? 1: this.selectedOption.toLowerCase() === 'parcela 2'?2: undefined;
    let date: string =  this.dateSelectedOption
    const currentDate = new Date();
    let startDate: Date = new Date();
    switch(date.toLowerCase()) {
      case "hoy":
        startDate = new Date(currentDate.setHours(23, 59, 59, 999));
        break;
      case "1 semana":
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        break;
      case "1 mes":
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        break;
      default:
        startDate = new Date(currentDate.setHours(23, 59, 59, 999));
        break;
    }
    this.sensorService.getSensorDataRecord(startDate.toISOString(), undefined, zoneId).subscribe((dataRecords: any) => {
      console.log('dataRecords', dataRecords);
      // Agrupar los registros por 'typeSensor' y fecha
      const groupedData = dataRecords.reduce((acc: any, record: any) => {
        const date = new Date(record.createdAt);
        const sensorType = record.typeSensor;
        const dateString = date.toISOString().split('T')[0] + " " + date.toISOString().split('T')[1].substring(0,5);
        // const dateString = date.toISOString().split('T')[0]; // Tomamos solo la parte de la fecha sin la hora
        console.log("date", dateString)
        if (!acc[sensorType]) {
          acc[sensorType] = {};
        }
        if (!acc[sensorType][dateString]) {
          acc[sensorType][dateString] = [];
        }
        acc[sensorType][dateString].push(record.lastValue);
        return acc;
      }, {});

      // Calcular el promedio de los valores para cada fecha y tipo de sensor
      const sensorData = Object.keys(groupedData).map(sensorType => ({
        name: sensorType,
        series: Object.keys(groupedData[sensorType]).map(dateString => ({
          name: dateString,
          value: groupedData[sensorType][dateString].reduce((sum: number, val: number) => sum + val, 0) / groupedData[sensorType][dateString].length
        }))
      }));

      console.log("sensorData", sensorData);
      this.moistureChart = [sensorData.find(item => item.name === this.MOISTURE_SENSOR)] || undefined;
      this.waterUsageChart = [sensorData.find(item => item.name === this.CAUDAL_SENSOR)] || undefined;
      this.temperatureChart = [sensorData.find(item => item.name === this.TEMPERATURE_SENSOR)] || undefined;
      this.humidityChart = [sensorData.find(item => item.name === this.HUMIDITY_SENSOR)] || undefined;
      console.log("sensor de moistureChart", this.moistureChart);
      console.log("sensor de waterUsageChart", this.waterUsageChart);
      console.log("sensor de temperatureChart", this.temperatureChart);
      console.log("sensor de humidityChart", this.humidityChart);
      // Emitir los datos transformados
      this.dataRecordsSubject.next(sensorData);
    });

    console.log("endDate", startDate.toISOString());


  }

  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  protected readonly multi = multi;
}
