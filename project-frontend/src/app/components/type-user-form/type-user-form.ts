import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserListTypeService } from '../../services/user-list-type-service';
import { UserType } from '../../common/user-type';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MyValidators } from '../../validators/my-validators';
import { MessageErrors } from '../form/message-errors/message-errors';

@Component({
  selector: 'app-type-user-form',
  imports: [ReactiveFormsModule, RouterLink, MessageErrors],
  templateUrl: './type-user-form.html',
})
export class TypeUserForm implements OnInit {
  nameUsed: string[] = [];

  typeUserForm: FormGroup = new FormGroup({
    typeName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      MyValidators.notOnlyWhiteSpace,
    ]),
  });

  currentUserType: UserType = new UserType();
  message: WritableSignal<string> = signal('');

  constructor(
    private userListTypeService: UserListTypeService,
    private route: ActivatedRoute,
  ) {}

  get typeName() {
    return this.typeUserForm.get('typeName');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentUserType.id = +params['id'] || 0;
      console.info('Current User Type ID: ', this.currentUserType.id, ' (0 means new user type)');
      if (this.currentUserType.id == 0) {
        this.updateUniqueTypeNameValidator();
        return;
      } else {
        this.userListTypeService.getUserType(this.currentUserType.id).subscribe((userType) => {
          this.currentUserType = userType;
          this.updateUniqueTypeNameValidator(this.currentUserType.typeName);
          this.typeUserForm.patchValue({
            typeName: this.currentUserType.typeName,
          });
        });
      }
    });
  }

  onSubmit() {
    console.info('Type User Form Submitted: ', this.typeUserForm.value);

    this.currentUserType.typeName = this.typeUserForm.value.typeName;
    this.userListTypeService.addUserType(this.currentUserType).subscribe({
      next: (response) => {
        console.info('User Type added successfully: ', response);

        this.message.set(`User type "${response.typeName}" added successfully!`);
        this.reset();
      },
      error: (error) => {
        this.message.set(
          `Error adding user type "${this.typeUserForm.value.typeName}". An user type with same name already exists.`,
        );
        console.error('Error adding user type: ', error);
      },
    });

    this.currentUserType.id = 0;
    this.currentUserType.typeName = '';
  }

  reset() {
    this.typeUserForm.reset();
    this.updateUniqueTypeNameValidator();
  }

  updateUniqueTypeNameValidator(previousName?: string) {
    this.userListTypeService.getTypeUserList().subscribe((data) => {
      this.nameUsed = data.map((type) => type.typeName || '');
      this.typeName?.addValidators(MyValidators.uniqueValidator(this.nameUsed, previousName));
    });
  }
}
