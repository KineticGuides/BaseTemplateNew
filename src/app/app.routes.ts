import { Routes } from '@angular/router';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { TemplateAltComponent } from './pages/template-alt/template-alt.component';
import { ResolverService } from './resolver.service';
import { TemplateListComponent } from './pages/template-list/template-list.component';

export const routes: Routes = [
    { path: '', component: TemplateHomeComponent, resolve: { data: ResolverService} },
    { path: 'numbers', component: TemplateListComponent },
    { path: 'template-list', component: TemplateListComponent, resolve: { data: ResolverService}  }
];
