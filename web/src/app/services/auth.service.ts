import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient , private cookie: CookieService) { }
  acess:any;
  login(email:string, password:string):Observable<any>{
    return this.http.post('http://localhost:3000/api/user/login', {email, password},{ withCredentials: true });
  }

  logout():Observable<any>{
     return this.http.post('http://localhost:3000/api/user/logout', {},{ withCredentials: true });
  }

  isAuthenticated(){
      return this.cookie.check('auth')
  }
  async getAccess(): Promise<string> {
    const response: any = await this.http.get('http://localhost:3000/api/access/check', { withCredentials: true }).toPromise();
    return response.access;
  }
  

}
