import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home';
import { NavComponent } from './nav/nav';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './service/auth.service';
import { LoginActivate } from './service/login.activate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile';
import { ModalAddEventComponent } from './modals/add-event';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    ModalAddEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  entryComponents: [],
  providers: [AuthService, LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
