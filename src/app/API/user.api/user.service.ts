import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginReq, ILoginRes, IUser } from '../../Models/user.model';
import { exhaustMap, Observable } from 'rxjs';
import { AuthService } from '../../Shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authService = inject(AuthService);

  private apiUrl = 'https://vn-fe-test-api.iwalabs.info/auth';

  constructor(private http: HttpClient) {}

  login(credentials: IUser): Observable<ILoginRes> {
    const loginRequest:ILoginReq = {
      data:{
        type:'auth',
        attributes:credentials
      }
    }
    return this.http.post<ILoginRes>(this.apiUrl, loginRequest).pipe(
      exhaustMap((res) => {
        const token = res?.data?.attributes?.token;
        if (token) {
          this.authService.login(token);
        }
        return [res];
    }));
  }
}
