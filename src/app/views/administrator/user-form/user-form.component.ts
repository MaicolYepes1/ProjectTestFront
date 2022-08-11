import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { User } from 'src/app/models/user';
import { AdministrationService } from 'src/app/services/administration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  title: string = 'Crear';
  user: any;
  clientId: number = 0;
  hide = true;
  loading: boolean = false;
  public newUser!: FormGroup;
  activateForm: boolean = false;
  clients: any;
  constructor(
    private formBuilder: FormBuilder,
    private services: AdministrationService,
    public matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public model: User
  ) {}

  ngOnInit(): void {
    this.newUser = this.createSignupForm();
    if (this.model != null) {
      this.activateForm = true;
      this.title = 'Editar';
      const setModel = {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        password: this.model.password,
        email: this.model.email,
        userId: this.model.userId,
        clientId: this.model.clientId,
        identification: this.model.identification
      };
      this.newUser.setValue(setModel);
    } else {
      this.title = 'Crear';
    }
    this.clientId = JSON.parse(localStorage.getItem('clientId')!);
    this.getClients();
  }

  getClients() {
    this.loading = true;
    this.services.getClients().subscribe(
      (Ok) => {
        this.loading = false;
        this.clients = Ok;
      },
      (Response) => {
        this.loading = false;
      }
    );
  }


  crear() {
    if (this.newUser.valid) {
      this.loading = true;
      this.services.addOrUpdateUser(this.newUser.value).subscribe(
        (Response) => {
          this.loading = false;
          Swal.fire({
            title: 'Creacion exitosa',
            icon: 'success',
          });
          this.matDialogRef.close();
        },
        (error) => {
          this.loading = false;
          this.activateForm = false;
          if (error.status === 400) {
            Swal.fire({
              title: 'Error en la creacion.',
              icon: 'error',
              text: 'El documento ingresado ya se encuentra registrado.',
            });
          } else {
            Swal.fire({
              title: 'Error desconocido',
              icon: 'error',
              text: error.message,
            });
          }
        }
      );
    }
  }

  actualizar() {
    if (this.newUser.valid) {
      this.loading = true;
      this.newUser.value.id = this.model.userId;
      this.services.addOrUpdateUser(this.newUser.value).subscribe(
        (Response) => {
          this.loading = false;
          if (Response) {
            this.messageAlert(
              'Actualización Exitosa',
              'Se actualizó correctamente!'
            );
            this.matDialogRef.close();
          } else {
            this.loading = false;
            Swal.fire({
              title: 'Error en la Actualización',
              icon: 'error',
              text: Response,
            });
          }
        },
        (error) => {
          this.loading = false;
          if (error.status === 400) {
            Swal.fire({
              title: 'Error en la Actualización',
              icon: 'error',
              text: 'Posiblemente el documento que intentas actualizar ya existe registrado en la app.',
            });
          } else {
            Swal.fire({
              title: 'Error en la Actualización',
              icon: 'error',
              text: error.message,
            });
          }
        }
      );
    }
  }

  messageAlert(title: string, message: string) {
    Swal.fire({
      title: title,
      icon: 'success',
      text: message,
    });
  }

  generatePassword() {
    var characters = '!"|#$%&/()=?¡-_';
    var numberChars = '0123456789';
    var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    var allChars = numberChars + upperChars + lowerChars + characters;
    var randPasswordArray = Array(8);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray[3] = characters;
    randPasswordArray = randPasswordArray.fill(allChars, 4);
    let test = this.shuffleArray(
      randPasswordArray.map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
    ).join('');
    return this.shuffleArray(
      randPasswordArray.map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
    ).join('');
  }

  shuffleArray(array: any) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  cerrar(): void {
    this.activateForm = false;
    this.loading = false;
    this.matDialogRef.close();
  }

  createSignupForm(): FormGroup {
    return this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userId: [0],
        clientId: [this.clientId],
        identification: [null, Validators.required],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required]),
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(8),
          ]),
        ],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }
}
