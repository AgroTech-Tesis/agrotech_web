import {Injectable} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { NzMessageService } from 'ng-zorro-antd/message';
import { HOST, hostSelected } from "../../../../environments/enviroment.conts";
import { Account } from "../model/account";
@Injectable({
    providedIn: 'root',
})
export class SecurityService {
    private signInService: string = `${hostSelected.host2}/sign-in`;
    private getSubscription?: Subscription;

    constructor(private _httpClient: HttpClient) {
    }

    add(account: Account, message: NzMessageService): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getSubscription = this._httpClient.post<any>(`${this.signInService}`, account).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (err) => {
                    if (err.status === 404) {
                        message.error(err.error || 'Error interno al procesar la solicitud');
                    } else {
                        message.error("Failed to Log In. Please, try again");
                    }
                    reject(err); // Rechaza la promesa en caso de error
                }
            });
        });
    }

}
