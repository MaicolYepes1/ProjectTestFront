import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './views/login-view/login.module';
import { CoreModule } from './core/core.module';
import { SpinnerModule } from './components/spinner/spinner.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule,
    CoreModule,
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
