import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/components/base-form";
import {Zone} from "zone.js/lib/zone-impl";

@Injectable({
  providedIn: 'root'
})
export class ZonesService extends BaseService<Zone>{

  constructor( http: HttpClient) {
    super(http, "/zones");
  }
}
