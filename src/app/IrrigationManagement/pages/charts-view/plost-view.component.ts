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
    NgxChartsModule],
  templateUrl: './plost-view.component.html',
  styleUrl: './plost-view.component.css'
})
export class PlostViewComponent implements OnInit{

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: any[] = [
    {name: 'Parcela 1'},
    {name: 'Parcela 2'},
    {name: 'Parcela 3'},
    {name: 'Parcela 4'},
    {name: 'Parcela 5'},
    {name: 'Parcela 6'}];
  addOnBlur = true;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  view: [number, number] = [500, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Año';
  yAxisLabel: string = 'Consumo de Agua';
  timeline: boolean = true;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  //token para el arduino iot cloud
  token: string | null = null;
  errorMessage: string | null = null;

  // get Dashboards
  dashboardsValues = {};
  constructor(private arduinoIotService: ArduinoIotService) {
    Object.assign(this, { multi });
  }

  ngOnInit() {
    this.arduinoIotService.getToken().subscribe(
      token => {
        console.log("token", token);
        this.arduinoIotService.getDashboards(token).subscribe(
          dashboards => {
            this.dashboardsValues = dashboards[0].widgets.map((widget: any) => ({
              last_value: widget.variables[0].last_value,
              last_value_updated_at: widget.variables[0].last_value_updated_at,
              variable_name: widget.variables[0].variable_name
            }));
            console.log(this.dashboardsValues);
          },
          error => {
            console.error('Error retrieving dashboards:', error);
          }
        );
      },
      error => {
        console.error('Error retrieving token:', error);
      }
    );
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  protected readonly multi = multi;
}
