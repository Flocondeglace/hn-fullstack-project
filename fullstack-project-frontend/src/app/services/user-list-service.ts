import { Injectable } from '@angular/core';
import { UserType } from '../common/user-type';
import { map, Observable } from 'rxjs';
import { User } from '../common/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  private userListUrl = `${environment.apiUrl}/user-list`;

  private userUrl = `${environment.apiUrl}/get-user`;

  private addUserUrl = `${environment.apiUrl}/create-user`;

  private deleteUserUrl = `${environment.apiUrl}/delete-user`;

  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userListUrl);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.httpClient.get<User>(url);
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.addUserUrl, user);
  }

  removeUser(id: number): Observable<User> {
    const url = `${this.deleteUserUrl}/${id}`;
    return this.httpClient.delete<User>(url);
  }
}
