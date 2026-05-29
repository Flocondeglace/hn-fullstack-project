import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { User } from '../../common/user';
import { UserListService } from '../../services/user-list-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserListTypeService } from '../../services/user-list-type-service';
import { ThSortable } from '../th-sortable/th-sortable';
import type { SortType, SortDirection } from '../../common/sort';
import { SortService } from '../../services/sort-service';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, ThSortable],
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  sortType: WritableSignal<SortType> = signal<SortType>('userTypeName');
  sortDirection: WritableSignal<SortDirection> = signal<SortDirection>('asc');
  users: WritableSignal<User[]> = signal<User[]>([]);
  typesMap: WritableSignal<Map<number, string>> = signal<Map<number, string>>(
    new Map<number, string>(),
  );

  cols_values: SortType[] = ['userTypeName', 'firstName', 'lastName', 'email'];
  cols_names: string[] = ['User Type', 'First Name', 'Last Name', 'Email'];

  constructor(
    private userListService: UserListService,
    private userListTypeService: UserListTypeService,
    private sortService: SortService,
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
      console.info('Retrieved users: ', data);
      this.users.set(data);
    });
    this.sortBy();
  }

  getValue(user: User, key: SortType): any {
    return user[key as keyof User];
  }

  removeUser(id: number): void {
    this.userListService.removeUser(id).subscribe((data) => {
      console.info('User removed successfully: ', data);
      this.updateList();
    });
  }

  onSort(type: SortType) {
    const { sortType, sortDirection } = this.sortService.updateSortParameters(
      type,
      this.sortType(),
      this.sortDirection(),
    );
    this.sortType.set(sortType);
    this.sortDirection.set(sortDirection);
    this.sortBy();
  }

  private sortBy() {
    this.users.set(this.sortService.sortBy(this.sortType(), this.sortDirection(), this.users()));
  }
}
