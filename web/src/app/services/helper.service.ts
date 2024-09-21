import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  url = 'http://localhost:3000/api/helper';
  public globalValueSubject: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  globalValue$ = this.globalValueSubject.asObservable();

  constructor(private http: HttpClient) {}

  addHelper(data: any): Observable<any> {
    return this.http.post(this.url, data, { withCredentials: true });
  }

  setGlobalValue(value: any): void {
    this.globalValueSubject.next(value);
  }

  getGlobalValue(): any {
    return this.globalValueSubject.getValue();
  }

  getHelpers(params: any = {}): Observable<any> {
    const Params = new HttpParams({ fromObject: params });
    console.log(Params);

    return this.http.get<any>(this.url, { params: Params, withCredentials: true });
  }

  getHelperById(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`, { withCredentials: true });
  }

  updateHelper(id: any, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data, { withCredentials: true });
  }

  deleteHelper(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { withCredentials: true });
  }
}
