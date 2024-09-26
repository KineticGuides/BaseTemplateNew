import { Routes } from '@angular/router';
import { ResolverService } from './resolver.service';
import { TemplateListComponent } from './pages/template-list/template-list.component';
import { UserListComponent } from './pages/crud/user/user-list/user-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { PasswordFormComponent } from './auth/password-form/password-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactDashboardComponent } from './pages/contact-dashboard/contact-dashboard.component';
import { CallDashboardComponent } from './pages/call-dashboard/call-dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MissedCallsComponent } from './pages/missed-calls/missed-calls.component';
import { ActiveCallPageComponent } from './pages/active-call-page/active-call-page.component';
import { SmsComponent } from './pages/sms/sms.component';

export const routes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'p', component: PasswordFormComponent },
    { path: 'home', component: HomePageComponent, resolve: { data: ResolverService}  },
    { path: 'contacts', component: ContactsComponent, resolve: { data: ResolverService}  },
    { path: 'call-dashboard/:id', component: CallDashboardComponent, resolve: { data: ResolverService}  }, 
    { path: 'contact-dashboard/:id', component: ContactDashboardComponent, resolve: { data: ResolverService}  }, 
    { path: 'contact-dash/:id', component: ContactDashboardComponent, resolve: { data: ResolverService}  },    
    { path: 'call-in-progress/:id/:id2', component: ActiveCallPageComponent, resolve: { data: ResolverService}  },
    { path: 'missed-calls', component: MissedCallsComponent, resolve: { data: ResolverService}  },
    { path: 'sms', component: SmsComponent, resolve: { data: ResolverService}  },
    { path: 'settings', component: SettingsComponent, resolve: { data: ResolverService}  }
];
