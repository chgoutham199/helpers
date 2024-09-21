import { Component ,ViewChild,ElementRef} from '@angular/core';
import { HelperHeadComponent } from "../helper-head/helper-head.component";
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
import { FormComponent } from "../form/form.component";
@Component({
  selector: 'app-addhelper',
  standalone: true,
  imports: [HelperHeadComponent, ReactiveFormsModule, CommonModule, FormComponent],
  templateUrl: './addhelper.component.html',
  styleUrl: './addhelper.component.scss'
})
export class AddhelperComponent {
  
}