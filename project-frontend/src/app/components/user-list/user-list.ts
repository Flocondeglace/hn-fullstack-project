import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { User } from '../../common/user';
import { UserListService } from '../../services/user-list-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserListTypeService } from '../../services/user-list-type-service';

export type SortType = 'id' | 'firstName' | 'lastName' | 'email' | 'userType';
export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
  sortType: WritableSignal<SortType> = signal<SortType>('id');
  sortDirection: WritableSignal<SortDirection> = signal<SortDirection>('asc');
  users: WritableSignal<User[]> = signal<User[]>([]);
  typesMap: WritableSignal<Map<number, string>> = signal<Map<number, string>>(
    new Map<number, string>(),
  );

  constructor(
    private userListService: UserListService,
    private userListTypeService: UserListTypeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userListTypeService.getTypeUserList().subscribe((types) => {
      const typesMap = new Map<number, string>();
      types.forEach((t) => {
        typesMap.set(t.id!, t.typeName!);
      });
      this.typesMap.set(typesMap);
    });
    this.updateList();
  }

  updateList(): void {
    this.userListService.getUserList().subscribe((data) => {
      console.log(data);
      this.users.set(data);
    });
    //this.sortBy();
  }

  removeUser(id: number): void {
    this.userListService.removeUser(id).subscribe((data) => {
      console.log(data);
      this.updateList();
    });
  }

  onSort(type: SortType) {}
}
