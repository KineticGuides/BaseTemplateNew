import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, from, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { CalendarModule } from '../../calendar/calendar.module';
import { ProviderCalendarModule } from '../../provider-calendar/provider-calendar.module';
import { HeySkipperComponent } from '../../widgets/hey-skipper/hey-skipper.component';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import { JsonPipe } from '@angular/common';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-resource-day-calendar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeySkipperComponent, CalendarModule, ProviderCalendarModule, NgbAlertModule, 
    NgbDatepickerModule, AppointmentFormComponent],
  templateUrl: './resource-day-calendar.component.html',
  styleUrl: './resource-day-calendar.component.css'
})
export class ResourceDayCalendarComponent  implements OnInit {

  id: any;
  data: any;
  booking: any = 'N';
  message: any;
  displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';
  practice: any = '1';
  resource_id: any = '';
  patient_id: any = '';
  start_date: any = '';
  start_time: any = '';
  end_time: any = '';

  model!: NgbDateStruct;
  currentDate: any = '2025-09-01';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router,
    public http: HttpClient  // used by upload
) { }

  ngOnInit(): void
  {      
      this._activatedRoute.data.subscribe(({ 
          data })=> { 
          this.data=data;
      }) 
  }

 formatDateString(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
}
closeIt() {
  this.booking='N';
}
changeDate() {
    console.log("Hey")
      console.log(this.model)
      this.currentDate=this.formatDateString(this.model['year'] + '-' + this.model['month'] + '-' + this.model['day']);
  }

  scheduleEvent(data: any) {
    this.id=data.id;
    this.resource_id = data.resource;
    this.start_date = data.start.value;
    this.end_time = data.end.value;
    this.booking='Y';
    console.log(data)
  }

postForm(): void {
  
    let formData: any = { "message": this.message }

    this._dataService.postData("hey-skipper", formData).subscribe((data: any)=> { 
      console.log(data.location)
      this._router.navigate([data.location]);
      console.log(this.data)
  }) 

  }


}
