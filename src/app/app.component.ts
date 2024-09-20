import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PageFooterComponent } from './layout/page-footer/page-footer.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageFooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BaseTemplate';
  showCall: any = 'N';

  userId: any = "";


  formData: any = { "userId": "0"}

  constructor(private _dataService: DataService) {}

  toggleMakeCall() {
    if (this.showCall=='N') {
      this.showCall = 'Y';
    } else {
      this.showCall = 'N';
    }
  }
  
  logout(): void {
    this.userId = localStorage.getItem("userId")  
    this.formData['userId']=this.userId;
    this._dataService.postData("logout-user", this.formData).subscribe((data: any)=> { 
      if (data.error_code=="0") {
        localStorage.removeItem('userId')
        location.replace("/")
      }
    })
  } 

}

