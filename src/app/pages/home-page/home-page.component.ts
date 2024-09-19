import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service'; 
import { HeySkipperComponent } from '../../widgets/hey-skipper/hey-skipper.component';

declare var $:any;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeySkipperComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  implements OnInit {

  data: any;
  message: any;

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

  postForm(): void {
  
    let formData: any = { "message": this.message }

    this._dataService.postData("hey-skipper", formData).subscribe((data: any)=> { 
      console.log(data.location)
      this._router.navigate([data.location]);
      console.log(this.data)
  }) 

  }


}
