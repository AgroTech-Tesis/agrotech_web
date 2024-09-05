import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Device} from "../model/device";
import {BaseService} from "../../shared/components/base-form";

@Injectable({
  providedIn: 'root'
})
export class DevicesService extends BaseService<Device>{
  constructor(http: HttpClient) {
    super(http, "/devices");
  }
}
