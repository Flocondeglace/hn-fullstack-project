import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { TypeUserList } from './components/type-user-list/type-user-list';
import { Menu } from './components/menu/menu';
import { TypeUserForm } from './components/type-user-form/type-user-form';

export const routes: Routes = [
  { path: 'users/new', component: UserList },
  { path: 'types-form', component: TypeUserForm },
  { path: 'types-form/:id', component: TypeUserForm },
  { path: 'users', component: UserList },
  { path: 'types', component: TypeUserList },
  { path: '', component: Menu },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
