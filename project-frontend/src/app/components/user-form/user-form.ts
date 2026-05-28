import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserType } from '../../common/user-type';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyValidators } from '../../validators/my-validators';
import { UserListService } from '../../services/user-list-service';
import { User } from '../../common/user';
import { UserListTypeService } from '../../services/user-list-type-service';
import { MessageErrors } from '../form/message-errors/message-errors';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink, MessageErrors],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit {
  userTypes: WritableSignal<UserType[]> = signal<UserType[]>([]);

  userForm: FormGroup = new FormGroup({
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      MyValidators.notOnlyWhiteSpace,
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      MyValidators.notOnlyWhiteSpace,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      MyValidators.notOnlyWhiteSpace,
    ]),
    userType: new FormControl(null, [Validators.required]),
  });

  currentUser: User = new User();
  message: WritableSignal<string> = signal('');

  constructor(
    private userListService: UserListService,
    private userListTypeService: UserListTypeService,
    private route: ActivatedRoute,
  ) {}

  get lastName() {
    return this.userForm.get('lastName');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get userType() {
    return this.userForm.get('userType');
  }

  ngOnInit(): void {
    this.userListTypeService.getTypeUserList().subscribe((types) => {
      this.userTypes.set(types);
      console.log('User types loaded: ', this.userTypes());
    });

    this.updateUniqueMailValidator();

    this.route.params.subscribe((params) => {
      console.log('Route params: ', params);
      this.currentUser.id = +params['id'] || 0;
      this.userListService.getUser(this.currentUser.id).subscribe((user) => {
        this.currentUser = user;

        this.updateUniqueMailValidator(user.email);
        this.userForm.patchValue({
          lastName: this.currentUser.lastName,
          firstName: this.currentUser.firstName,
          email: this.currentUser.email,
          userType: this.currentUser.userTypeId,
        });
        console.log('Current user loaded: ', this.currentUser);
      });
    });
  }

  onSubmit() {
    console.log('User Form Submitted: ', this.userForm.value);

    this.currentUser.firstName = this.firstName?.value;
    this.currentUser.lastName = this.lastName?.value;
    this.currentUser.email = this.email?.value;
    this.currentUser.userTypeId = this.userType?.value;
    console.log('Current user to submit: ', this.currentUser);
    console.log('Current user type to submit: ', this.currentUser.userTypeId);

    this.userListService.addUser(this.currentUser).subscribe({
      next: (response) => {
        console.log('User added successfully: ', response);

        this.message.set(`User "${response.firstName} ${response.lastName}" added successfully!`);
        this.reset();
      },
      error: (error) => {
        this.message.set(
          `Error adding user "${this.userForm.value.firstName} ${this.userForm.value.lastName}". An user with same name already exists.`,
        );
        console.error('Error adding user: ', error);
      },
    });

    this.currentUser.id = 0;
  }

  reset() {
    this.userForm.reset();
    this.updateUniqueMailValidator();
  }

  updateUniqueMailValidator(previousEmail?: string) {
    this.userListService.getUserList().subscribe((data) => {
      let emailUsed = data.map((user) => user.email || '');
      console.log('Existing user with mail: ', emailUsed);
      this.email?.addValidators(MyValidators.uniqueValidator(emailUsed, previousEmail));
    });
  }
}
