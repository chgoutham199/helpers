import { Component,Output,EventEmitter } from '@angular/core';
import { HelpersDetailsComponent } from '../helpers-details/helpers-details.component';
import { HelperListComponent } from '../helpers-list/helpers-list.component';

@Component({
  selector: 'app-view-helpers',
  standalone: true,
  imports: [HelpersDetailsComponent,HelperListComponent],
  templateUrl: './view-helpers.component.html',
  styleUrl: './view-helpers.component.scss'
})
export class ViewHelpersComponent {

  selectedHelper: any;
  deletedHelperId: any;
  @Output() helperDeleted = new EventEmitter<string>();
  

  onSelectHelper(helper: any): void {
    this.selectedHelper = helper;
  }
  onHelperDeleted(id: string): void {
     this.deletedHelperId = id;
     this.helperDeleted.emit(this.deletedHelperId);
  }

}
