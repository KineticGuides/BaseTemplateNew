import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { PageFooterComponent } from './layout/page-footer/page-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarMenuComponent, PageFooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BaseTemplate';

  logout() {
    localStorage.removeItem('userId')
    location.replace('/')
  }
}
