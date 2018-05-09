import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CustomerApp } from '../_models/customerapp';
import { CallbackDigest } from '../_models/callback';
import { CallbackViewModel } from '../_models/callback';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FlexService {

    //private postAppUrl: string = environment.API_ENDPOINT + 'customerapp\/submitapp';
    private getAppUrl: string = environment.API_ENDPOINT + 'api/v1/applications';
    private postAppUrl: string = environment.API_ENDPOINT + 'api/v1/applications/submit';
    private putAppUrl: string = environment.API_ENDPOINT + 'api/v1/applications/update';
    private reviseAppUrl: string = environment.API_ENDPOINT + 'api/v1/applications/revise';
    private maxAppUrl: string = environment.API_ENDPOINT + 'api/v1/applications/maximize';
    private genFormsUrl: string = environment.API_ENDPOINT + 'api/v1/applications/generateforms';
    private cancelAppUrl: string = environment.API_ENDPOINT + 'api/v1/applications/cancel';
    private _apiKey: string = environment.API_KEY;

    constructor(private http: HttpClient) { }

    getApp(appid: number): Observable<CallbackViewModel> {

        let url = `${this.getAppUrl}/${appid}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'API_KEY': this._apiKey
            })
        };
        return this.http.get(url, httpOptions)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateApp(app: CustomerApp): Observable<CallbackViewModel> {

        const url = `${this.putAppUrl}`;
        const body = JSON.stringify(app);
        //const headers = new Headers({ 'Content-Type': 'application/json' });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'API_KEY': this._apiKey
            })
        };
        return this.http.put(url, body, httpOptions)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    reviseApp(app: CustomerApp): Observable<CallbackViewModel> {

        const url = `${this.reviseAppUrl}`;
        const body = JSON.stringify(app);
        //const headers = new Headers({ 'Content-Type': 'application/json' });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'API_KEY': this._apiKey
            })
        };
        return this.http.put(url, body, httpOptions)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    maxApp(app: CustomerApp): Observable<CallbackViewModel> {

        const url = `${this.maxAppUrl}`;
        const body = JSON.stringify(app);
        //const headers = new Headers({ 'Content-Type': 'application/json' });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'API_KEY': this._apiKey
            })
        };
        return this.http.put(url, body, httpOptions)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    submitApp(app: CustomerApp): Observable<CallbackViewModel> {

        const url = `${this.postAppUrl}`;
        const body = JSON.stringify(app);
        //const headers = new Headers({ 'Content-Type': 'application/json' });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'API_KEY': this._apiKey
            })
        };
        return this.http.post(url, body, httpOptions)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    generateForms(appid: number): Observable<CallbackViewModel> {

        let url = `${this.genFormsUrl}/${appid}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'API_KEY': this._apiKey
            })
        };
        return this.http.get(url, httpOptions)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    cancelApp(app: CustomerApp) {

        let url = `${this.cancelAppUrl}/${app.lenderAppId}`;
        const body = JSON.stringify(app);
        //const headers = new Headers({ 'Content-Type': 'application/json' });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'API_KEY': this._apiKey
            })
        };
        return this.http.patch(url, body, httpOptions)
            //.do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

   private handleError(error: HttpErrorResponse) {
        let errMsg: string | null = null;
        if (error.error)
            errMsg = error.error.message;
        else
            errMsg = error.statusText;
        return Observable.throw(
            {
                "errObj": error,
                "errMsg": errMsg
            });
    };

}