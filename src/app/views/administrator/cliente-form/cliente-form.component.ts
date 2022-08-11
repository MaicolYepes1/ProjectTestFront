import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { AdministrationService } from 'src/app/services/administration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  title: string = 'Crear';
  user: any;
  hide = true;
  loading: boolean = false;
  public clientData!: FormGroup;
  activateForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private services: AdministrationService,
    public matDialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Client
  ) {}

  ngOnInit(): void {
    this.clientData = this.createSignupForm();
    if (this.model != null) {
      this.activateForm = true;
      this.title = 'Editar';
      const setModel = {
        name: this.model.name,
        identification: this.model.identification
      };
      this.clientData.setValue(setModel);
    } else {
      this.title = 'Crear';
    }
  }

  crear() {
    if (this.clientData.valid) {
      this.loading = true;
      this.services.addOrUpdateClient(this.clientData.value).subscribe(
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
    if (this.clientData.valid) {
      this.loading = true;
      this.clientData.value.id = this.model.clientId;
      this.services.addOrUpdateClient(this.clientData.value).subscribe(
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
          Swal.fire({
            title: 'Error en la Actualización',
            icon: 'error',
            text: error.message,
          });
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

  getServers() {}

  cerrar(): void {
    this.activateForm = false;
    this.loading = false;
    this.matDialogRef.close();
  }

  createSignupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      identification: ['', Validators.required],
      clientId: [0],
    });
  }
}
