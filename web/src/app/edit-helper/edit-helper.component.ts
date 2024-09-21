import { Component } from '@angular/core';
import { HelperHeadComponent } from "../helper-head/helper-head.component";
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-edit-helper',
  standalone: true,
  imports: [HelperHeadComponent, FormComponent],
  templateUrl: './edit-helper.component.html',
  styleUrl: './edit-helper.component.scss'
})
export class EditHelperComponent {

}
