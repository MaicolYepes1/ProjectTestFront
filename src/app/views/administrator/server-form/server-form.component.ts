import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministrationService } from 'src/app/services/administration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css'],
})
export class ServerFormComponent implements OnInit {
  title: string = 'Crear';
  user: any;
  hide = true;
  loading: boolean = false;
  serverData!: FormGroup;
  activateForm: boolean = false;
  openAddServices: boolean = false;
  servicios: any;
  clients: any;
  constructor(
    private formBuilder: FormBuilder,
    private services: AdministrationService,
    public matDialogRef: MatDialogRef<ServerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any
  ) {}

  ngOnInit(): void {
    this.serverData = this.createSignupForm();
    if (this.model != null) {
      debugger
      this.activateForm = true;
      this.title = 'Editar';
      const setModel = {
        name: this.model.name,
        serverId: this.model.serverId,
        totalCapacity: this.model.totalCapacity,
        occupiedCapacity: this.model.occupiedCapacity,
        ip: this.model.ip,
        servicios: this.model.servicios,
        clientId: this.model.clientId
      };
      this.serverData.setValue(setModel);
    } else {
      this.title = 'Crear';
    }
    this.getServices();
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
    if (this.serverData.valid) {
      this.loading = true;
      this.services.addOrUpdateServer(this.serverData.value).subscribe(
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
          Swal.fire({
            title: 'Error desconocido',
            icon: 'error',
            text: error.message,
          });
        }
      );
    }
  }

  getServices() {
    this.loading = true;
    this.services.getServices().subscribe(
      (Ok) => {
        this.loading = false;
        this.servicios = Ok;
      },
      (Response) => {
        this.loading = false;
      }
    );
  }

  actualizar() {
    if (this.serverData.valid) {
      this.loading = true;
      this.serverData.value.id = this.model.serviceId;
      this.services.addOrUpdateServer(this.serverData.value).subscribe(
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
      serverId: [0],
      name: ['', Validators.required],
      ip: [''],
      totalCapacity: [''],
      occupiedCapacity: ['0'],
      servicios: [],
      clientId: []
    });
  }
}
