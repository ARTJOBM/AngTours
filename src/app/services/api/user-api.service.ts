import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API } from "../../shared/api";
import { IRegistrationRequest } from '../../pages/auth/registration/registration.component';

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
    
     
register(body: IRegistrationRequest): Observable<any> {
  return this.http.post<any>(
    this.api.register,
    body,
    { headers: { 'Content-Type': 'application/json' } }
  );

  }

}