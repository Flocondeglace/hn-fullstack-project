import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { UserType } from '../common/user-type';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserListTypeService {
  private typeListUrl = `${environment.apiUrl}/userTypes`;

  private addTypeUrl = `${environment.apiUrl}/create-type`;

  private deleteTypeUrl = `${environment.apiUrl}/delete-type`;

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
    return this.httpClient.post<UserType>(this.addTypeUrl, userType);
  }

  removeUserType(id: number): Observable<UserType> {
    const url = `${this.deleteTypeUrl}/${id}`;
    return this.httpClient.delete<UserType>(url);
  }
}

interface GetResponseTypeUsers {
  _embedded: {
    userTypes: UserType[];
  };
}
