import { Injectable } from '@angular/core';
import { UserType } from '../common/user-type';
import { map, Observable } from 'rxjs';
import { User } from '../common/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  private userListUrl = 'http://localhost:8080/api/user-list';

  private userUrl = 'http://localhost:8080/api/get-user';

  private addUserUrl = 'http://localhost:8080/api/create-user';

  private deleteUserUrl = 'http://localhost:8080/api/delete-user';

  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userListUrl).pipe(
      map((response) => {
        console.log('Response from getUserList: ', response);
        return response;
      }),
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.httpClient.get<User>(url);
  }

  addUser(user: User): Observable<any> {
    console.log('Adding User: ', user);
    console.log('POST URL: ', this.addUserUrl);

    return this.httpClient.post<User>(this.addUserUrl, user);
  }

  removeUser(id: number): Observable<User> {
    const url = `${this.deleteUserUrl}/${id}`;
    console.log('DELETE URL: ', url);
    return this.httpClient.delete<User>(url);
  }
}
