import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {WeatherForecastsService} from "../../services/weather-forecasts.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {LegendPosition, NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {single} from "../../../irrigation/data-records/model/BarChartData";
// import {single1} from "../../model/PieChartData";
import {DevicesService} from "../../../devices/services/devices.service";
import {isEmpty, Subject} from "rxjs";
import {SensorDataRecordsService} from "../../../irrigation/data-records/services/sensor-data-records.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(
    private weatherForecastService: WeatherForecastsService,
    private notificationService: NotificationsService,
    private deviceService: DevicesService,
    private sensorService: SensorDataRecordsService) {
    // Object.assign(this, { single })
    // Object.assign(this, { single1 });
  }

  //Variables
  WeatherData: any;

  single1: any
  single: any
  devicesStatusSubject: Subject<any> = new Subject();
  dataRecordsSubject: Subject<any> = new Subject();
  caudalSensorData: any[] = []
  temperatureSensorData: any[] = []
  moistureSensorData: any[] = []
  humiditySensorData: any[] = []
  notificationList: any[] = []
  temperatureFilteredBy5LastHours: any = null;
  caudalFilteredBy5LastHours: any = null;
  humidityFilteredBy5LastHours: any = null;
  moistureFilteredBy5LastHours: any = null;
  private readonly TEMPERATURE_SENSOR: string = "SENSOR DE TEMPERATURA";
  private readonly CAUDAL_SENSOR: string = "SENSOR DE CAUDAL";
  private readonly MOISTURE_SENSOR: string = "SENSOR DE HUMEDAD";
  private readonly HUMIDITY_SENSOR: string = "SENSOR DE HUMEDAD DEL AIRE";
  temperatureHasData: Boolean = true;
  caudalHasData: Boolean = true;
  moistureHasData: Boolean = true;
  humidityHasData: Boolean = true;

  ngOnInit() {

    // Get weather forecast
    this.weatherForecastService.getWeatherData('Tumbes')
      .then(data => {
        this.WeatherData = data;
      })
      .catch(error => {
        console.error('Error fetching weather data', error);
      });
    this.notificationService.getNotification().subscribe((data: any) => {
      this.notificationList = data;
    });
    this.getDevicesStatus();
    this.devicesStatusSubject.subscribe(status => {
      this.single1 = status;
    });

    this.getSensorDataRecord();
    this.dataRecordsSubject.subscribe(records =>{
      console.log("records", records)
      this.caudalSensorData = records.filter((caudal:any)=> caudal.typeSensor === this.CAUDAL_SENSOR)
      this.temperatureSensorData = records.filter((temperature:any)=> temperature.typeSensor === this.TEMPERATURE_SENSOR)
      this.moistureSensorData = records.filter((moisture:any)=> moisture.typeSensor === this.MOISTURE_SENSOR)
      this.humiditySensorData = records.filter((moisture:any)=> moisture.typeSensor === this.HUMIDITY_SENSOR)
      // this.single is an arrays that contains the average of the values in the last 5 hours
      this.temperatureFilteredBy5LastHours = this.getDataRecordsAverageInTheLast5Hours(this.temperatureSensorData, this.TEMPERATURE_SENSOR)
      this.caudalFilteredBy5LastHours = this.getDataRecordsAverageInTheLast5Hours(this.caudalSensorData, this.CAUDAL_SENSOR)
      this.moistureFilteredBy5LastHours = this.getDataRecordsAverageInTheLast5Hours(this.moistureSensorData, this.MOISTURE_SENSOR)
      this.humidityFilteredBy5LastHours = this.getDataRecordsAverageInTheLast5Hours(this.humiditySensorData, this.HUMIDITY_SENSOR)

      this.temperatureFilteredBy5LastHours === null? this.temperatureHasData = !this.temperatureHasData: this.temperatureHasData = true;
      this.caudalFilteredBy5LastHours === null? this.caudalHasData = !this.caudalHasData: this.caudalHasData = true;
      this.moistureFilteredBy5LastHours === null? this.moistureHasData = !this.moistureHasData: this.moistureHasData = true;
      this.humidityFilteredBy5LastHours === null? this.humidityHasData = !this.humidityHasData: this.humidityHasData = true;

      console.log("RESPUESTA", this.humidityHasData)
    })


  }
  // BAR CHART
  formatDate(dateString: any) {
    // dependencia 'moment' muy pesado para ejecutar el npm run build, por eso se ha comentado y buscado otra solución
    // console.log("dateString", dateString);
    // console.log("moment", moment(dateString).format('DD/MM/YYYY HH:mm:ss'));
    // return moment(dateString).format('DD/MM/YYYY HH:mm:ss');
    console.log("dateString", dateString);

    const date = new Date(dateString);

    // Obteniendo los componentes de la fecha
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Formateando la fecha
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    console.log("formattedDate", formattedDate);

    return formattedDate;
  }
  isHourInTheMorning(time: string): Boolean {
    return time === 'AM';
  }
  convertDate(hour: string, date: Date = new Date()): string{
    if (hour[1] == ":") {
      hour = "0" + hour[0];
    }
    if (!this.isHourInTheMorning(date.toLocaleString().slice(-2))){
      return date.toLocaleDateString() + " " + (parseInt(hour) + 12).toString();
    } else {

      return date.toLocaleDateString() + " " + hour;
    }
  }
  getDataRecordsAverageInTheLast5Hours(dataRecord: any[], typeSensor: string): any {
    // Agrupar los datos por hora
    const groupedData: { [key: string]: any[] } = {};

    dataRecord.forEach((record: any) => {
      const date = new Date(record.name);
      console.log("date", date.toLocaleString())
      let hour = date.toLocaleString().substring(10, 12); // Agrupar por año-mes-día-hora
      console.log("hour", hour)
      hour = this.convertDate(hour, date)

      // console.log("hora", hour)
      if (!groupedData[hour]) {
        groupedData[hour] = [];
      }

      groupedData[hour].push(record);

    });
    console.log("Datos agrupados por hora:", groupedData);

    // Calcular el promedio de los valores dentro de cada grupo
    let sensorData: any[] = Object.keys(groupedData).map(hour => {
      const records = groupedData[hour];
      const averageValue = records.reduce((sum, record) => sum + record.value, 0) / records.length;

      return {
        name: hour,
        value: averageValue,
        typeSensor: records[0].typeSensor // Suponemos que el tipo de sensor es el mismo dentro del grupo
      };
    });

    console.log("Datos con promedio de temperatura:", sensorData);

    // Filtrar las últimas 5 horas
    let now = new Date();
    let fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000).toLocaleString(); // Hora actual menos 5 horas
    console.log("convertirlo en date", new Date(fiveHoursAgo))
    console.log("now", now)
    console.log("fiveHoursAgo", fiveHoursAgo)
// Crear un objeto para las últimas 5 horas con valores predeterminados
    const last5HoursData = Array.from({ length: 5 }, (_, index) => {
      let date: Date = new Date(now.getTime() - (index * 60 * 60 * 1000));
      let hour = this.convertDate(date.toLocaleTimeString().substring(0,2), date);
      console.log("momento de la verdad", hour)
      // hour = this.convertDate(hour.toLocaleTimeString().substring(0,2));
      // let formattedHour = hour.toLocaleString().slice(0, 13);
      return {
        name: hour,
        value: 0,
        typeSensor: typeSensor
      };
    });
    console.log("arreglo prueba", last5HoursData)

    // Crear un objeto para una búsqueda rápida de los elementos del variableArray por el name
    const variableArrayMap = new Map(sensorData.map(item => [item.name, item]));

  // Reemplazar los elementos en el defaultArray si hay un match en el variableArray
      const mergedArray = last5HoursData.map(item => {
        const matchingItem = variableArrayMap.get(item.name);
        return matchingItem ? matchingItem : item;
      });

      console.log(mergedArray);
      let value = 0;
      mergedArray.map(data=>{
        0 !== data.value? value = data.value: 0;
      })
    if (value !== 0){
      console.log("arreglo listo para mostrar:", mergedArray)
      return mergedArray
    }
    else {
      console.log("error", mergedArray)
      return null
    }
  }


  getSensorDataRecord(){
    this.sensorService.getSensorDataRecord(undefined, undefined, undefined).subscribe((dataRecords: any)=>{
      // Transformar dataRecords para cambiar 'lastValue' a 'value'
      let sensorData: any[] = dataRecords.map((record: any) => {
        let transformedRecord = {
          ...record,
          value: record.lastValue,
          name: record.createdAt
        };
        delete transformedRecord.lastValue;
        delete transformedRecord.createdAt;
        return transformedRecord;
      });
      this.dataRecordsSubject.next(sensorData)
      // this.caudalSensorData = sensorData.filter((caudal:any)=> caudal.typeSensor === 'SENSOR DE CAUDAL')
      // this.temperatureSensorData = sensorData.filter((temperature:any)=> temperature.typeSensor === 'SENSOR DE TEMPERATURA')
      // this.moistureSensorData = sensorData.filter((moisture:any)=> moisture.typeSensor === 'SENSOR DE HUMEDAD')

    });
  }



  view: [number, number] = [300, 300];

  // options
  barPadding = 8;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#274C77', '#1F2937', '#274C77', '#1F2937', '#274C77'],
  };


  onSelect(event: any) {
    // console.log(event);
  }


  // PIE CHART

  connectedDevices = 0;
  disconnectedDevices = 0;
  failedDevices = 0;
  deviceStatus: any
  getDevicesStatus(): void {
    this.deviceService.getAll().subscribe((devices: any) => {
      devices.forEach((device: any) => {
        if (device.status == 'CONNECTED') {
          this.connectedDevices++;
        } else if (device.status == 'DISCONNECTED') {
          this.disconnectedDevices++;
        } else if (device.status == 'FAILED') {
          this.failedDevices++;
        }
      })
      this.devicesStatusSubject.next( [
        {
          "name": "Con fallas",
          "value": this.failedDevices
        },
        {
          "name": "Desconectados",
          "value": this.disconnectedDevices
        },
        {
          "name": "Conectados",
          "value": this.connectedDevices
        }
      ]);
    });
  }


  view1: [number, number] = [300, 200];

  // options
  gradient1: boolean = false;
  showLabels1: boolean = false;
  isDoughnut1: boolean = false;
  showLegend1: boolean = false;
  legendPosition1: LegendPosition = 'below' as LegendPosition;
  colorScheme1 = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#e21111','#333131', '#297739'],
  };


  onSelect1(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate1(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate1(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
