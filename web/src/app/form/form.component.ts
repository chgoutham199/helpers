import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HelperService } from '../services/helper.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('kycInput') kycInput!: ElementRef;
  @ViewChild('maleref')maleref!:ElementRef;
  @ViewChild('femaleref')femaleref!:ElementRef;
  @ViewChild('othersref')othersref!:ElementRef;
  imageUrl: any;
  kycFile: any;
  kycImageUrl: any;
  initialdata:any;
  kycFileName: string = '';
  kycFileSize: string = '';
  kycFileIcon: string = '';
  roles: string[] = ['Quality Analyst', 'Senior Quality Analyst', 'Full Stack Developer', 'Senior Full Stack Developer', 'Team Lead'];
  addHelperForm!: FormGroup;
  organizations: string[] = ['Inncircles-Arena','Inncircles-ASBL' ];
  isEditMode: boolean = false;
  helperId: string | null = null;
  erros:string='';
  // document:any
  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.addHelperForm = this.fb.group({
      photo : [null, Validators.required],
      type: ['', Validators.required],
      organization: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      vehicleType: ['None'],
      vehicleNumber: [''],
      document: [null],
     
 
    });

    this.addHelperForm.get('vehicleType')?.valueChanges.subscribe(value => {
      this.onVehicleTypeChange(value);
    });

    this.route.paramMap.subscribe(params => {
      this.helperId = params.get('id');
   if (this.helperId) {
        this.isEditMode = true;
        this.loadHelperDetails(this.helperId);
        this.addHelperForm.get('document')?.clearValidators();
      } else {
        this.addHelperForm.get('document')?.setValidators(Validators.required);
      }
      this.addHelperForm.get('document')?.updateValueAndValidity();
    });
    
  }

  loadHelperDetails(id: string): void {
    this.helperService.getHelperById(id).subscribe((res) => {
      const helper = res.helper;
      const {
        photo,
        type,
        organization,
        name,
        gender,
        phone,
        email,
        vehicleType,
        vehicleNumber,
        document,
        documentName,
        documentSize
      } = helper;
       this.imageUrl ='data:image/png/jpeg/jpg;base64,' + helper.photo;
       this.kycFile=helper.document;
       this.kycFileName = helper.documentName;
      this.kycFileSize = helper.documentSize
      this.kycFileIcon = this.getFileIcon(helper.documentName);
      this.initialdata = {
        photo,
        type,
        organization,
        name,
        gender,
        phone,
        email,
        vehicleType,
        vehicleNumber,
        documentName,
        documentSize
      };
      this.addHelperForm.patchValue({
        photo: helper.photo,
        type: helper.type,
        organization: helper.organization,
        name: helper.name,
        gender: helper.gender,
        phone: helper.phone,
        email: helper.email,
        vehicleType: helper.vehicleType,
        vehicleNumber: helper.vehicleNumber,
        document: helper.document,
      });
    });
  }

  getFileIcon(fileName: string): string {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    switch (fileExtension) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'image';
      case 'doc':
      case 'docx':
        return 'description';
      default:
        return 'insert_drive_file';
    }
  }

  triggerFileUpload(): void {
    this.fileInput.nativeElement.click();
  }

  triggerKycUpload(): void {
    this.kycInput.nativeElement.click();
  }
   selectmale(){
    this.maleref.nativeElement.click();
   }
   selectFemale(){
    this.femaleref.nativeElement.click();
   }
   selectOthers(){
          this.othersref.nativeElement.click();

   }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.addHelperForm.patchValue({ photo: file });

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onKycFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.kycFile = file;
      this.kycFileName = file.name
      this.kycFileSize = (file.size / (1024 * 1024)).toFixed(2);
      this.kycFileIcon = this.getFileIcon(file.name);
      this.addHelperForm.patchValue({ document: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.kycImageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.addHelperForm.valid) {
      const formData = new FormData();
     if(this.addHelperForm.get('photo')?.value!=this.initialdata?.photo) {
       formData.append('photo', this.addHelperForm.get('photo')?.value);
       
     } 
      formData.append('type', this.addHelperForm.get('type')?.value);
      formData.append('organization', this.addHelperForm.get('organization')?.value);
      formData.append('name', this.addHelperForm.get('name')?.value);
      formData.append('gender', this.addHelperForm.get('gender')?.value);
      formData.append('phone', this.addHelperForm.get('phone')?.value);
      formData.append('email', this.addHelperForm.get('email')?.value);
      formData.append('vehicleType', this.addHelperForm.get('vehicleType')?.value);
      formData.append('vehicleNumber', this.addHelperForm.get('vehicleNumber')?.value);
      formData.append('document', this.addHelperForm.get('document')?.value);
      formData.append('documentName', this.kycFileName || '');
      formData.append('documentSize', this.kycFileSize || '');

      if (this.isEditMode && this.helperId) {
        this.helperService.updateHelper(this.helperId, formData).subscribe(res => {
          if (res) {
            this.router.navigateByUrl('/');
          }
        }, err => {
          console.log(err);
          this.erros=err.error.message;
        });
      } else {
        this.helperService.addHelper(formData).subscribe(res => {
          if (res) {
            this.router.navigateByUrl('/');
          }
        }, err => {
          console.log(err);
          this.erros=err.error.message;
        });
      }
    }
  }
  
  isFormChanged(): boolean {
    const { document = null, ...currentData } = {
      ...this.addHelperForm.value,
      documentName: this.kycFileName,
      documentSize: this.kycFileSize
    };
    
    console.log(this.initialdata);
    console.log(currentData);
    return JSON.stringify(this.initialdata) !== JSON.stringify(currentData);
  }
  

  onVehicleTypeChange(value: string): void {
    const vehicleNumberControl = this.addHelperForm.get('vehicleNumber');
    if (value !== 'None') {
      vehicleNumberControl?.setValidators([Validators.required]);
    } else {
      vehicleNumberControl?.clearValidators();
    }
    vehicleNumberControl?.updateValueAndValidity();
  }
    handleBack(){
      this.router.navigateByUrl('/');
    }



}