import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-emptyhelper',
  standalone: true,
  imports: [],
  templateUrl: './emptyhelper.component.html',
  styleUrl: './emptyhelper.component.scss'
})
export class EmptyhelperComponent {

  constructor(private router: Router) { }

  handleClick(){
    this.router.navigateByUrl('/add-helper')
  }

}
