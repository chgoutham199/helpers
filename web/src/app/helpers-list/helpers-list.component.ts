import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelperService } from '../services/helper.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-helpers-list',
  standalone: true,
  imports: [FormsModule, CommonModule,InfiniteScrollModule],
  templateUrl: './helpers-list.component.html',
  styleUrl: './helpers-list.component.scss'
})
export class HelperListComponent implements OnInit, OnChanges {
  helpers: any[] = [];
  selectedHelper: any = null;
  selector:string = '.helper-list';
  searchTimeout: any;
  @Input() deletedHelper: any;
  @Output() selectHelper = new EventEmitter<any>();
  searchQuery: string = '';
  filteredHelpers: any[] = [];
  limit: number = 10;
  skip: number = 0;
  totalHelpers: number = 0;
  isLoading: boolean = false;
  filterOpen: boolean = false;
  organizations:any[] = [{ label: 'Inncircles-Arena', selected: false }, { label: 'Inncircles-ASBL', selected: false }]
  types:any[]=[{ label: 'Quality Analyst', selected: false }, { label: 'Senior Quality Analyst', selected: false }, { label: 'Full Stack Developer', selected: false }, { label: 'Senior Full Stack Developer', selected: false }, { label: 'Team Lead', selected: false }];
  genders:any[]=[{ label:'Male', selected: false }, {label:'Female', selected: false }, {label:'Others', selected: false }];
  vehicleTypes:any[]=[{ label:'None', selected: false }, {label:'Auto', selected: false }, {label:'Car', selected: false }, {label:'Bike', selected: false }];
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.loadHelpers();
    
  }
  ngOnDestroy(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }


  ngOnChanges(changes: any): void {

    if (changes.deletedHelper && changes.deletedHelper.currentValue) {
      this.helpers = this.helpers.filter(helper => helper._id !== this.deletedHelper);
      this.filteredHelpers = this.helpers;
      if (this.helpers.length == 0) {
        this.helperService.setGlobalValue(false);
        // console.log(this.helperService.getGlobalValue());
      }
      if (this.selectedHelper && this.selectedHelper._id === this.deletedHelper) {
        this.selectedHelper = this.helpers.length > 0 ? this.helpers[0] : null;
        this.selectHelper.emit(this.selectedHelper);
      }
    }
  }
  loadHelpers(): void {
    this.isLoading = true;
    const params = {
      search: this.searchQuery,
      organization: this.organizations.filter(org => org.selected == true).map(org => org.label),
      type: this.types.filter(type => type.selected == true).map(type => type.label),
      gender: this.genders.filter(gender=> gender.selected== true).map(gender=>gender.label),
      vehicleType: this.vehicleTypes.filter(vehicleType=> vehicleType.selected== true).map(vehicleType=>vehicleType.label),
      limit: this.limit,
      skip: this.skip,
    };
    console.log(params);
    this.helperService.getHelpers(params).subscribe(
      (res) => {
        this.helpers = [...this.helpers, ...res.helpers];
        this.filteredHelpers = this.helpers;
        this.totalHelpers = res.total;
        this.isLoading = false;
      
        if (this.helpers.length > 0) {
          this.helperService.setGlobalValue(true);
          this.selectedHelper = this.helpers[0];
          this.selectHelper.emit(this.selectedHelper);
        }
        else if(this.totalHelpers==0)
          this.helperService.setGlobalValue(false);
          this.selectHelper.emit(this.helpers[0]);

        
      }
      ,
      (err) => {
        console.log(err);
        this.isLoading=false
      }
    );

  }

  onSearch(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.clearData();
      this.loadHelpers();
    }, 1000)
  }

  onSelect(helper: any): void {
    this.selectedHelper = helper;
    this.selectHelper.emit(helper);
  }

  isSelected(helper: any): boolean {
    return this.selectedHelper === helper;
  }

   onScroll():void{
    console.log('scroll');
    if (this.isLoading || this.helpers.length >= this.totalHelpers) 
         return;
    this.skip += this.limit;
    this.loadHelpers();
   }

   toggleFilter():void{
     this.filterOpen=  !this.filterOpen;
    
   }
   resetFilters(): void {
    this.clearData();
    this.organizations.forEach(org => org.selected = false);
    this.types.forEach(type => type.selected = false);
    this.genders.forEach(gender=>gender.selected=false);
    this.vehicleTypes.forEach(vehicleType=>vehicleType.selected=false);
    this.loadHelpers();
    this.toggleFilter();
  }

  applyFilters(): void {
    this.clearData();
    this.loadHelpers();
    this.toggleFilter()
  }


  clearData():void{
    this.helpers = [];
    this.skip = 0;
    this.limit = 10;
  }
  

}