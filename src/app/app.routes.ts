import { Routes } from '@angular/router';
import { ResolverService } from './resolver.service';
import { TemplateListComponent } from './pages/template-list/template-list.component';
import { UserListComponent } from './pages/crud/user/user-list/user-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { PasswordFormComponent } from './auth/password-form/password-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

export const routes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'p', component: PasswordFormComponent },
    { path: 'home', component: HomePageComponent, resolve: { data: ResolverService}  },
    { path: 'contacts', component: ContactsComponent, resolve: { data: ResolverService}  }
];
