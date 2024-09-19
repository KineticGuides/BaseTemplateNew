import { Component, AfterViewInit, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent  implements OnInit, AfterViewInit {
  
  data: any;
  formData: any = {phone: ""};
  colData: any = {country: "", languages: ""};
  keys: any;
  values: any;

  @Input() path: any = '';
  @Input() id: any = '';
  @Input() id2: any = '';
  @Input() id3: any = '';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _dataService: DataService, private router: Router) {}

  closeIt() {
   this.close.emit('N');
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {  
     const userId=localStorage.getItem('userId')
     if (userId!==null) {
      $('#sidebar-nav').show()
      $('#sidebar-menu').show()
      $('#top-header').show()
      this.router.navigate(['/home']);
     }

  }

  validatePhoneNumber(value: string) {
    const sanitizedValue = value.replace(/\D/g, ''); // Remove non-digit characters
    this.formData['phone'] = sanitizedValue;
  }

  postForm(): void {

    this._dataService.postData("post-phone", this.formData).subscribe((data: any)=> { 
      if (data.error_code==0) {
          localStorage.setItem("uu",data.id)
          localStorage.setItem('userId', data.userId)
          this.router.navigate(['/home']);
          (window as any).initializeTwilioClient();
          $('#sidebar-nav').show()
          $('#sidebar-menu').show()
          $('#top-header').show()
      } else {
          //  $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
      }
  }) 

  }

}
