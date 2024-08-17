import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../web-sockets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent  implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.subscription = this.webSocketService.onMessage().subscribe(
      (message) => {
        console.log('Received message:', message);
      },
      (err) => console.error('WebSocket error:', err)
    );
  //  setTimeout(this.clickit(), 3000);
  //  setTimeout(this.clickit(), 6000);
  //  setTimeout(this.clickit(), 9000);
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.webSocketService.close();
  }

  clickit(): any {
    this.webSocketService.sendMessage('{"text":"Hello World"}')
  }
}