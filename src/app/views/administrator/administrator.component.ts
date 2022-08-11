import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { AdministrationService } from 'src/app/services/administration.service';
import swal from 'sweetalert2';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { ServerFormComponent } from './server-form/server-form.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent implements OnInit {
  loading: boolean = false;
  clientes: any;
  servers: any;
  services: any;
  clientId: number = 0;
  users: any;
  completed: boolean = false;
  panelOpenState = false;
  constructor(
    private _administratorService: AdministrationService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.iniciar();
  }

  iniciar() {
    this.getClients();
    this.getServers();
    this.getUsers();
    this.getServices();
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'identification', 'acciones'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getClients() {
    this.loading = true;
    this._administratorService.getClients().subscribe(
      (Ok) => {
        this.loading = false;
        this.clientes = Ok;
      },
      (Response) => {
        this.loading = false;
        this.showMessage(Response.message, 'error');
      }
    );
  }

  getServers() {
    this.loading = true;
    this._administratorService.getServers().subscribe(
      (Ok) => {
        this.loading = false;
        this.servers = Ok;
        this.servers.forEach((element: any) => {
          if (
            Number(element.occupiedCapacity) / Number(element.totalCapacity) <=
            Number(0.5)
          ) {
            element.completed = true;
          } else {
            element.completed = false;
          }
        });
      },
      (Response) => {
        this.loading = false;
        this.showMessage(Response.message, 'error');
      }
    );
  }

  getInfoClient(e: any) {
    this.clientId = e.clientId;
    localStorage.setItem('clientId', JSON.stringify(this.clientId));
  }

  getUsers() {
    this.loading = true;
    this._administratorService.getUsers().subscribe(
      (Ok) => {
        this.loading = false;
        this.users = Ok;
        this.dataSource = this.users;
      },
      (Response) => {
        this.loading = false;
        this.showMessage(Response.message, 'error');
      }
    );
  }

  getServices() {
    this.loading = true;
    this._administratorService.getServices().subscribe(
      (Ok) => {
        this.loading = false;
        this.services = Ok;
      },
      (Response) => {
        this.loading = false;
        this.showMessage(Response.message, 'error');
      }
    );
  }

  showMessage(text: string, icon: any) {
    swal
      .fire({
        text: text,
        icon: icon,
      })
      .then((result) => {});
  }

  openAdd(form: string) {
    if (form === 'user') {
      const dialogRef = this._matDialog.open(UserFormComponent, {});
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    } else if (form === 'service') {
      const dialogRef = this._matDialog.open(ServiceFormComponent, {});
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    } else if (form === 'client') {
      const dialogRef = this._matDialog.open(ClienteFormComponent, {});
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    } else if (form === 'server') {
      const dialogRef = this._matDialog.open(ServerFormComponent, {});
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    }
  }

  openUpdate(form: string, e: any) {
    if (form === 'user') {
      const dialogRef = this._matDialog.open(UserFormComponent, {
        data: e,
      });
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    } else if (form === 'service') {
      const dialogRef = this._matDialog.open(ServiceFormComponent, {
        data: e,
      });
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    } else if (form === 'client') {
      const dialogRef = this._matDialog.open(ClienteFormComponent, {
        data: e,
      });
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    } else if (form === 'server') {
      const dialogRef = this._matDialog.open(ServerFormComponent, {
        data: e,
      });
      dialogRef.afterClosed().subscribe((data) => {
        this.iniciar();
      });
    }
  }
}
