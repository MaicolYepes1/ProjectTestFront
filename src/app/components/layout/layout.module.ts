import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout-routing.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { AdministratorModule } from 'src/app/views/administrator/administrator.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministratorModule,
    RouterModule.forChild(LayoutRoutes),
    SpinnerModule
  ],
})
export class LayoutProfileModule {}
