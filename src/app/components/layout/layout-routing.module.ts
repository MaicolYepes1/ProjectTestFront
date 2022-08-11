import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from 'src/app/views/administrator/administrator.component';



export const LayoutRoutes: Routes = [
  { path: 'inicio', component: AdministratorComponent },
  //{ path: 'usuarios', component: AccountStatusComponent },

];

export const APP_ROUTING_LAYOUT = RouterModule.forRoot(LayoutRoutes);
