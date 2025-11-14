import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {DevicesService} from "../../services/devices.service";
import {Device} from "../../model/device";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {formatDateTime} from "../../../shared/utils/format-date-time";


@Component({
  selector: 'devices-view',
  standalone: true,
  imports: [NzIconModule, NzTableModule, NzCollapseModule, NzButtonModule, NzDividerModule, NzTagModule, HttpClientModule, NgForOf, NgIf],
  templateUrl: './devices-view.component.html',
  styleUrl: './devices-view.component.css'
})
export class DevicesViewComponent implements OnInit{
  deviceData: Device[] = [];
  displayedColumns: string[] = ['Device Name', 'Location', 'Installation Date', 'Status'];

  constructor(private deviceService: DevicesService) {}

  ngOnInit(): void {
    this.getAllDevices();
  }

  getAllDevices(){
    var riceCropsId = JSON.parse(localStorage.getItem("riceCrops")!);
    this.deviceService.getAllDeviceByRiceCropsId(riceCropsId).subscribe((devices: any) =>{
      this.deviceData = devices;
      console.log(this.deviceData)
    })
  }

  protected readonly formatDateTime = formatDateTime;
}
