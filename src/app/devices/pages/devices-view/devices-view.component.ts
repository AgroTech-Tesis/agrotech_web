import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DevicesService} from "../../services/devices.service";
import {Device} from "../../model/device";
import {HttpClientModule} from "@angular/common/http";
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {NgForOf, NgIf} from "@angular/common";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {formatDateTime} from "../../../shared/utils/format-date-time";


@Component({
  selector: 'devices-view',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatIconModule, MatTableModule, HttpClientModule, MatExpansionModule, NgForOf, NgIf, MatButton, MatDivider],
  templateUrl: './devices-view.component.html',
  styleUrl: './devices-view.component.css'
})
export class DevicesViewComponent implements OnInit{
  deviceData: MatTableDataSource<Device>
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  panelOpenState = false;

  displayedColumns: string[] = ['Device Name', 'Location', 'Installation Date', 'Status'];

  constructor(private deviceService: DevicesService) {
      this.deviceData = {} as MatTableDataSource<Device>

  }
  ngOnInit(): void {
    this.getAllDevices();
  }

  getAllDevices(){
    this.deviceService.getAll().subscribe((devices: any) =>{
      this.deviceData = new MatTableDataSource(devices);
      console.log(this.deviceData.data)
    })
  }

  protected readonly formatDateTime = formatDateTime;
}
