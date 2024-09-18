import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../web-sockets.service';
import { DataService } from '../../data.service';
import { CallDashboardComponent } from '../../pages/telecom/call-dashboard/call-dashboard.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../localstorage.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CallDashboardComponent, FormsModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent  implements OnInit, OnDestroy {
  data:any;

  private subscription!: Subscription;

  call_alert_open: any = 'N';
  caller: any = '';
  operator_phone: any = '';
  online: any = 'N';
  live: any = 'N';
  openedWindow: Window | null = null;  
  Sid: any = '';
  ParentSid: any = '';

  message: any;

  toggleCallAlert() {
    if (this.call_alert_open=='N') {
      this.call_alert_open='Y';
    } else {
      this.call_alert_open='N';
      localStorage.setItem('rejectCall','Y')
    }
  }
  
  answerCall() {
    localStorage.setItem('answerCall','Y');
  }


  doConnect() {

    const url = "https://app.kinetic.md/tel.php?userId="+this.operator_phone;  

    if (this.openedWindow && !this.openedWindow.closed) {
        this.openedWindow.focus(); 
    } else {
       this.openedWindow = window.open(url, '_blank');
    }   
  }

  doDisconnect() {

  }

  constructor(
    private webSocketService: WebSocketService,
    private _dataService: DataService,
    private _router: Router,
    private storageService: StorageService = new StorageService
) { }

  ngOnInit(): void {
    this.subscription = this.webSocketService.onMessage().subscribe(
      (message) => {
        console.log('Received message:', message);

        if (message['Status']=='new') {
          // New Incoming Call
          if (this.call_alert_open=='N') {
            this.call_alert_open='Y';
            this.caller = message['From']
            this.message=message;
            this.ParentSid="";
          }
        }

        if (message['Status']=='in-progress') {
          console.log(message['To']);
          let str = message['To'];
          let result = str.replace('client:', '');
          if (result=='+1'+this.operator_phone||result==this.operator_phone) {
               this.ParentSid = message['ParentSid'];
               this.setBusy();
               this.live = 'Y';
          } else {
              console.log("other")
              if (this.ParentSid=='') {
                this.call_alert_open='N';
              }
          }
        }
        if (message['Status']=='completed') {
            if (this.ParentSid == message['ParentSid']) {
              this.setOnline();
            }
        }
      },
      (err) => console.error('WebSocket error:', err)
    );

    setInterval(() => {
      this.online = localStorage.getItem('online');
      console.log(this.online)
    }, 500); 
    
  }
  
  doQueue() {
    localStorage.setItem('connect-queue','Y')   
  } 

  setOnline(): void {
    let formData:any = {}
    this._dataService.postData("set-online", formData).subscribe((data: any)=> {
    this.online='Y';
  })

}

 setBusy(): void {
  let formData:any = {}
  this._dataService.postData("set-busy", formData).subscribe((data: any)=> {
    this.online='B';
})
}

  setOffline(): void {
    let formData:any = {}
    this._dataService.postData("set-offline", formData).subscribe((data: any)=> {
      this.online='N';
  })
  }

  postLogout() {
    localStorage.removeItem("uu");
    localStorage.removeItem("uid");
    localStorage.removeItem("role");
    localStorage.removeItem("session");
    location.replace("https://app.kineticmd.ai");
  }

  ngAfterViewInit(): void {
    this._dataService.getUser().subscribe((data: any)=> { 
      this.data=data;
      this.operator_phone = this.data['operator_phone'];
      this.online = this.data['online'];
      console.log(this.data)
  }) 

  }

  postSkipper(): void {
    let formData: any = { "message": this.message }
    this._dataService.postSkipper("hey-skipper", formData).subscribe((data: any)=> { 
      if (data.action=='set-practice') {
        this.storageService.setItem('practice_id', data.value);
      }
//      console.log(data.location)
//      this._router.navigate([data.location]);
//      console.log(this.data)
  }) 

  }

  forwardCall() {
      let formData={ phone: "8473215397", sid: this.ParentSid }
      this._dataService.postData("forward-call", formData).subscribe((data: any)=> { 
        this.data=data;
        console.log(this.data['formData'])
    }) 
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.webSocketService.close();
  }
}