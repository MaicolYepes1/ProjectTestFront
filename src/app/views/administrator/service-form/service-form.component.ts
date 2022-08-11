import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/app/models/service';
import { AdministrationService } from 'src/app/services/administration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {

  title: string = 'Crear';
  user: any;
  hide = true;
  loading: boolean = false;
  public serviceData!: FormGroup;
  activateForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private services: AdministrationService,
    public matDialogRef: MatDialogRef<ServiceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Service
  ) {}

  ngOnInit(): void {
    this.serviceData = this.createSignupForm();
    if (this.model != null) {
      this.activateForm = true;
      this.title = 'Editar';
      const setModel = {
        name: this.model.name,
        serviceId: this.model.serviceId,
        occupiedCapacity: this.model.occupiedCapacity,
        umbral: this.model.umbral
      };
      this.serviceData.setValue(setModel);
    } else {
      this.title = 'Crear';
    }
  }

  crear() {
    if (this.serviceData.valid) {
      this.loading = true;
      this.services.addOrUpdateService(this.serviceData.value).subscribe(
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
    if (this.serviceData.valid) {
      this.loading = true;
      this.serviceData.value.serviceId = this.model.serviceId;
      this.services.addOrUpdateService(this.serviceData.value).subscribe(
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


  cerrar(): void {
    this.activateForm = false;
    this.loading = false;
    this.matDialogRef.close();
  }

  createSignupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      umbral: ['', Validators.required],
      serviceId: [0],
      occupiedCapacity: [0],
    });
  }
}
