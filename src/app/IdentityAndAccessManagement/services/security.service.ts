import {Injectable} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
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

    add(account: Account, _snackBar: MatSnackBar):  Promise<any> {
        return new Promise((resolve) => {
            this.getSubscription = this._httpClient.post<any>(`${this.signInService}`, account).
                subscribe({
                    next: (data) => { resolve(data) },
                    error: () => { openSnackBarError(_snackBar) }
                })
        });
    }
    
}
export const openSnackBarError = function (
    _snackBar: MatSnackBar,
    _message: string = 'Error interno al procesar la solicitud'
) {
    openSnackBar(
        _snackBar,
        _message,
        'mat-warn'
    );

}
export const openSnackBar = function (
    _snackBar: MatSnackBar,
    message: string,
    type: string = 'mat-primary',
    position: any = 'center',
    duration: number = 6000
) {
    let arrayClass = type.split(' ');
    arrayClass.push('mat-toolbar');
    _snackBar.open(message, 'X', {
        horizontalPosition: position,
        verticalPosition: 'bottom',
        duration: duration,
        panelClass: arrayClass,
    });
}