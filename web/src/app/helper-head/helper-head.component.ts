import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-helper-head',
  standalone: true,
  imports: [],
  templateUrl: './helper-head.component.html',
  styleUrl: './helper-head.component.scss'
})
export class HelperHeadComponent {
  @Input() helperName: string='';
  constructor(private router: Router) { }
  handleClick(){
    this.router.navigateByUrl('/')
  }
}
