import { Routes } from '@angular/router';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { ResolverService } from './resolver.service';
import { TemplateListComponent } from './pages/template-list/template-list.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { MenuListComponent } from './pages/crud/cmm_menu/menu-list/menu-list.component';
import { MenuItemListComponent } from './pages/crud/cmm_menu_item/menu-item-list/menu-item-list.component';
import { PracticeListComponent } from './pages/crud/cmm_practice/practice-list/practice-list.component';
import { TableListComponent } from './pages/crud/cmm_table/table-list/table-list.component';
import { TableItemListComponent } from './pages/crud/cmm_table/table-item-list/table-item-list.component';
import { UserListComponent } from './pages/crud/user/user-list/user-list.component';
import { IncomingPhoneListComponent } from './pages/crud/incoming_phone/incoming-phone-list/incoming-phone-list.component';
import { OperatorListComponent } from './pages/crud/operator/operator-list/operator-list.component';
import { KnownCallerListComponent } from './pages/crud/known_caller/known-caller-list/known-caller-list.component';
import { PracticeContactListComponent } from './pages/crud/practice_contact/practice-contact-list/practice-contact-list.component';
import { MemberListComponent } from './pages/crud/member/member-list/member-list.component';

export const routes: Routes = [
    { path: '', component: TemplateHomeComponent, resolve: { data: ResolverService} },
    { path: 'practices', component: PracticeListComponent, resolve: { data: ResolverService}  },
    { path: 'menus', component: MenuListComponent, resolve: { data: ResolverService} },
    { path: 'menu-items', component: MenuItemListComponent, resolve: { data: ResolverService} },
    { path: 'roles', component: RoleListComponent, resolve: { data: ResolverService} },
    { path: 'get-operator-list', component: OperatorListComponent, resolve: { data: ResolverService} },
    { path: 'tables', component: TableListComponent, resolve: { data: ResolverService} },
    { path: 'users', component: UserListComponent, resolve: { data: ResolverService} },
    { path: 'columns', component: TableItemListComponent, resolve: { data: ResolverService} },
    { path: 'contacts', component: PracticeContactListComponent, resolve: { data: ResolverService} },
    { path: 'known-caller', component: KnownCallerListComponent, resolve: { data: ResolverService} },
    { path: 'incoming-phone', component: IncomingPhoneListComponent, resolve: { data: ResolverService} },
    { path: 'members', component: MemberListComponent, resolve: { data: ResolverService} },
    { path: 'template-list', component: TemplateListComponent, resolve: { data: ResolverService}  }
];
