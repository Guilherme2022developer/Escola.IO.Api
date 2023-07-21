import { HttpHeaders } from '@angular/common/http'
import { throwError } from 'rxjs';


export abstract class SeviceBase {
    protected UrlServiceV1: string = "https://localhost:5001/";
    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'

            })
        };
    }

    protected ObterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.ObterTokenUsuario()}`,
            })
        };
    }

    protected ObterTokenUsuario() {

        return localStorage.getItem('eio.token');
    }

    obterUsuario() {
        const item = localStorage.getItem('eio.user');
        if (item !== null) {
            return JSON.parse(item);
        }
        return null;
    }


    protected extractData(response: any) {
        return response.data || {}
    }

    protected seviceError(error: Response | any) {

        let errMsg: string;

        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''} `;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(error);
    }
}