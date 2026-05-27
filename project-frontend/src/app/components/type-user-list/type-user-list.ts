import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserListTypeService } from '../../services/user-list-type-service';
import { UserType } from '../../common/user-type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-type-user-list',
  imports: [RouterLink],
  templateUrl: './type-user-list.html',
  styleUrl: './type-user-list.scss',
})
export class TypeUserList implements OnInit {
  typeUsers: WritableSignal<UserType[]> = signal<UserType[]>([]);

  constructor(private userListTypeService: UserListTypeService) {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList(): void {
    this.userListTypeService.getTypeUserList().subscribe((data) => {
      console.log(data);
      this.typeUsers.set(data);
    });
  }

  removeUserType(id: number): void {
    this.userListTypeService.removeUserType(id).subscribe((data) => {
      console.log(data);
      this.updateList();
    });
  }
}
