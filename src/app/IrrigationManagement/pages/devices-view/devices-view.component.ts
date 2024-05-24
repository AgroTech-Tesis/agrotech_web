import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DeviceService} from "../../services/device.service";
import {Device} from "../../model/Device";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'devices-view',
  standalone: true,
  imports: [MatIconModule, MatTableModule, HttpClientModule],
  templateUrl: './devices-view.component.html',
  styleUrl: './devices-view.component.css'
})
export class DevicesViewComponent {
  deviceData: MatTableDataSource<Device>
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
}
