import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { UserType } from '../common/user-type';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserListTypeService {
  private typeListUrl = 'http://localhost:8080/api/userTypes';

  private addTypeUrl = 'http://localhost:8080/api/create-type';

  private deleteTypeUrl = 'http://localhost:8080/api/delete-type';

  constructor(private httpClient: HttpClient) {}

  getTypeUserList(): Observable<UserType[]> {
    return this.httpClient
      .get<GetResponseTypeUsers>(this.typeListUrl)
      .pipe(map((response) => response._embedded.userTypes));
  }

  getUserType(id: number): Observable<UserType> {
    const url = `${this.typeListUrl}/${id}`;
    return this.httpClient.get<UserType>(url);
  }

  addUserType(userType: UserType): Observable<any> {
    console.log('Adding User Type: ', userType);
    console.log('POST URL: ', this.addTypeUrl);

    return this.httpClient.post<UserType>(this.addTypeUrl, userType);
  }

  removeUserType(id: number): Observable<UserType> {
    const url = `${this.deleteTypeUrl}/${id}`;
    console.log('DELETE URL: ', url);
    return this.httpClient.delete<UserType>(url);
  }
}

interface GetResponseTypeUsers {
  _embedded: {
    userTypes: UserType[];
  };
}
