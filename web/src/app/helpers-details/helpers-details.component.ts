import { CommonModule, DatePipe } from '@angular/common';
import { Component ,Input,Output,EventEmitter} from '@angular/core';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-helpers-details',
  standalone: true, 
  imports: [CommonModule,DatePipe],
  templateUrl: './helpers-details.component.html',
  styleUrl: './helpers-details.component.scss'
})
export class HelpersDetailsComponent {
  
  @Input() helper: any;
  @Output() helperDeleted = new EventEmitter<string>();
  toggle :boolean = false;
  constructor(private helperService: HelperService,private router:Router) {}
  deleteHelper(id: string): void {
    this.helperService.deleteHelper(id).subscribe(
      (res) => {
        this.helperDeleted.emit(id);
      },
      (err) => {
        console.log(err);
      }
    );
    this.toggle = false;  
  }
   handleEditClick(){
            this.router.navigateByUrl('/edit-helper/'+this.helper._id);
   }
   openDocumentInNewTab(documentBase64: string): void {
    const byteCharacters = atob(documentBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
  
    window.open(blobUrl, '_blank');
  }
  
  togglePop(){
      this.toggle = !this.toggle;
  }

}