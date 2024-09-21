import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private online: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(navigator.onLine);
  public onlineStatus$:Observable<boolean>=this.online.asObservable();
  constructor() {
    window.addEventListener('online',()=>{
      this.online.next(true);
    });
    window.addEventListener('offline',()=>{
      this.online.next(false);
    });
   }

   public isOnline():boolean{
     return this.online.value;
   }

}
