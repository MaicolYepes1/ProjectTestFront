import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { AdministratorComponent } from './administrator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServerFormComponent } from './server-form/server-form.component';



@NgModule({
  declarations: [
    AdministratorComponent,
    ClienteFormComponent,
    UserFormComponent,
    ServiceFormComponent,
    ServerFormComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SpinnerModule,
    SharedModule
  ]
})
export class AdministratorModule { }
