import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { TypeUserList } from './components/type-user-list/type-user-list';
import { Menu } from './components/menu/menu';
import { TypeUserForm } from './components/type-user-form/type-user-form';
import { UserForm } from './components/user-form/user-form';
import { UserDetails } from './components/user-details/user-details';

export const routes: Routes = [
  { path: 'user-details/:id', component: UserDetails },
  { path: 'user-form/:id', component: UserForm },
  { path: 'user-form', component: UserForm },
  { path: 'types-form', component: TypeUserForm },
  { path: 'types-form/:id', component: TypeUserForm },
  { path: 'users', component: UserList },
  { path: 'types', component: TypeUserList },
  { path: '', component: Menu },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
