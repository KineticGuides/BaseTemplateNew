import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../web-sockets.service';
import { DataService } from '../../data.service';
import { CallDashboardComponent } from '../../pages/telecom/call-dashboard/call-dashboard.component';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CallDashboardComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent  implements OnInit, OnDestroy {
  data:any;

  private subscription!: Subscription;

  call_alert_open: any = 'N';
  caller: any = '';
  operator_phone: any = '';
  live: any = 'N';
  
  Sid: any = '';
  ParentSid: any = '';

  message: any;

  toggleCallAlert() {
    if (this.call_alert_open=='N') {
      this.call_alert_open='Y';
    } else {
      this.call_alert_open='N';
    }
  }
  
  constructor(private webSocketService: WebSocketService, private _dataService: DataService) {  }
  
  ngOnInit(): void {
    this.subscription = this.webSocketService.onMessage().subscribe(
      (message) => {
        console.log('Received message:', message);
        if (this.call_alert_open=='N') {
            this.call_alert_open='Y';
            this.caller = message['from']
            this.message=message;
        } else {
          if (message['Status']==="in-progress") {
            console.log(message['To']);
            console.log('+1'+this.operator_phone);
            if (message['To']=='+1'+this.operator_phone) {
                 console.log("Me")
                 this.ParentSid = message['ParentSid'];
                 this.live = 'Y';
            } else {
                console.log("other")
                this.call_alert_open='N';
            }
          } else {
            if (message['Status']==="completed") {
              this.call_alert_open='N'; 
            }
          }
        }
      },
      (err) => console.error('WebSocket error:', err)
    );
  }

  ngAfterViewInit(): void {
    this._dataService.getUser().subscribe((data: any)=> { 
      this.data=data;
      this.operator_phone = this.data['operator_phone'];
      console.log(this.data)
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