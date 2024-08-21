import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../web-sockets.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent  implements OnInit, OnDestroy {
  data:any;

  private subscription!: Subscription;

  call_alert_open: any = 'N';
  operator_phone: any = '';
  
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
              console.log("Status Good")
            this.call_alert_open='Y';
            this.message=message;
        } else {
          if (message['Status']==="in-progress") {
            if (message['To']=='+1'+this.operator_phone) {

            } else {
              this.call_alert_open='N';
            }
          } else {
            
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.webSocketService.close();
  }
}