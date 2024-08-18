import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {

    }

  ngOnDestroy(): void {

  }

}