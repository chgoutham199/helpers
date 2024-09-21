import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OfflineComponent } from './offline/offline.component';
import { NetworkService } from './services/network.service';
import { NgxSpinnerModule } from "ngx-spinner";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,OfflineComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
  isOnline:boolean=true;
  constructor(private network:NetworkService ) {}

  ngOnInit(){
    this.network.onlineStatus$.subscribe(isOnline=>{
      this.isOnline=isOnline;
    });
  }

}