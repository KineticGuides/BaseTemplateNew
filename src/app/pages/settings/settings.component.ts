import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { HeySkipperComponent } from '../../widgets/hey-skipper/hey-skipper.component';
import { SearchFilterPipe } from '../../search-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


declare var $:any;

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeySkipperComponent, SearchFilterPipe, NgxPaginationModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent  implements OnInit {

  data: any;
  txt: any;
  message: any;
  p: any = 1;
  searchText: string = '';
  calling: any = 'N';

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
      $('#sidebar-nav').show()
      $('#sidebar-menu').show()
      $('#top-header').show()
      const userId = localStorage.getItem('userId')
      $('#loginstatus').html('Connected As: ' + userId)
  }

  makeCall(): void {

  }

  hangUp(): void {
    location.reload();
  }


  callBack(m: any) {
      this.calling='Y';
      $('#outphone2').val(m.callBack);
      (window as any).makeCall2();
  }
  postForm(): void {
  
    let formData: any = { "message": this.message }

    this._dataService.postData("hey-skipper", formData).subscribe((data: any)=> { 
      console.log(data.location)
      this._router.navigate([data.location]);
      console.log(this.data)
  }) 

  }

  hideCall(m: any): void {
  
    if (confirm('Are you sure you want to delete this record?')) {
      this._dataService.postData("hide-call", m).subscribe((data: any)=> { 
        this.data=data;
    }) 
    }
  }

  toggleReply(m: any): void {
      if (m.reply=='Y') {
        m.reply='N';
      } else {
        m.reply='Y';
      }

  }

}
