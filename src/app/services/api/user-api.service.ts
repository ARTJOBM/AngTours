import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API } from "../../shared/api";


@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    private api = API;
    private http = inject(HttpClient);

    constructor() { }
    auth(body: any): Observable <any> {
        return this.http.post<any>(this.api.auth, body);
    }
}