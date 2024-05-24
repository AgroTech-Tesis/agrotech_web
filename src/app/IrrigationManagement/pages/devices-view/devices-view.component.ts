import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DeviceService} from "../../services/device.service";
import {Device} from "../../model/Device";
import {HttpClientModule} from "@angular/common/http";
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {NgForOf, NgIf} from "@angular/common";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";


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

  // dataSource:any = [
  //   {ubication: "Parcela 1", name: 'Esp32-1', createDate: "20-04-2024 12:19:50", status: 'connected'},
  //   {ubication: "Parcela 2", name: 'Esp32-2', createDate: "20-04-2024 12:19:50", status: 'connected'},
  //   {ubication: "Parcela 3", name: 'Esp32-3', createDate: "20-04-2024 12:19:50", status: 'fail'},
  //   {ubication: "Parcela 4", name: 'Esp32-4', createDate: "20-04-2024 12:19:50", status: 'disconnected'},
  // ]
  displayedColumns: string[] = ['name', 'location', 'createDate', 'status'];
  constructor(private deviceService: DeviceService) {
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

  formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('es-ES');
  }

}
