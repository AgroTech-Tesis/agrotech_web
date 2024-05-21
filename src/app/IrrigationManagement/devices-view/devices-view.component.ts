import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'devices-view',
  standalone: true,
  imports: [MatIconModule, MatTableModule],
  templateUrl: './devices-view.component.html',
  styleUrl: './devices-view.component.css'
})
export class DevicesViewComponent {
  dataSource:any = [
    {ubication: "Parcela 1", name: 'Esp32-1', createDate: "20-04-2024 12:19:50", status: 'connected'},
    {ubication: "Parcela 2", name: 'Esp32-2', createDate: "20-04-2024 12:19:50", status: 'connected'},
    {ubication: "Parcela 3", name: 'Esp32-3', createDate: "20-04-2024 12:19:50", status: 'fail'},
    {ubication: "Parcela 4", name: 'Esp32-4', createDate: "20-04-2024 12:19:50", status: 'disconnected'},
  ]
  displayedColumns: string[] = ['name', 'ubication', 'createDate', 'status'];
  constructor() {}
}
