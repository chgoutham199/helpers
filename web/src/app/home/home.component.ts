import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { EmptyhelperComponent } from '../emptyhelper/emptyhelper.component';
import { ViewHelpersComponent } from '../view-helpers/view-helpers.component';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, EmptyhelperComponent, ViewHelpersComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  helpers: any[] = [];
  hasHelper: boolean = true;

  constructor(private helperService: HelperService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.helperService.globalValue$.subscribe((value) => {
      this.hasHelper = value;
      console.log('Global value changed:', value);
      this.cdr.detectChanges();
    });

    

  
}
}