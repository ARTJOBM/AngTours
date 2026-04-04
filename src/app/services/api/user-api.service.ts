import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API } from "../../shared/api";
import { IRegistrationRequest } from '../../pages/auth/registration/registration.component';
import { IAuthUser, IAuthUserRes, IRegisterUser, IRegUserRes } from '../../models/user';
import { LoaderService } from "../loader.service";
import { delay, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    private api = API;
    private http = inject(HttpClient);
    private loader = inject(LoaderService);

    constructor() { }
    auth(body: IAuthUser): Observable <IAuthUserRes> {

        this.loader.setLoader(true);

        return this.http.post<IAuthUserRes>(this.api.auth, body)

     .pipe(
     delay(1000), 
     finalize(() => this.loader.setLoader(false)) 
    );
    }
    
     
    register(body: IRegisterUser): Observable<IRegUserRes> {

       this.loader.setLoader(true);

       return this.http.post<IRegUserRes>(this.api.register, body)
    
     .pipe(
     delay(1000), 
     finalize(() => this.loader.setLoader(false)) 
    );

  }

}