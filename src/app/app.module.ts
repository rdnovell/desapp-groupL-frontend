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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile';
import { ModalAddEventComponent } from './stepper/add-event';
import { ModalAddMailComponent } from './modals/add-mail';
import { ModalDelMailComponent } from './modals/del-mail';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './service/data.service';
import { MyEventsComponent } from './my-events/my-events';
import { ModalAddItemComponent } from './modals/add-item';
import { ModalEventItemsComponent } from './modals/event-items';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    MyEventsComponent,
    ModalAddEventComponent,
    ModalAddMailComponent,
    ModalDelMailComponent,
    ModalAddItemComponent,
    ModalEventItemsComponent,
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
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [ModalAddMailComponent, ModalDelMailComponent, ModalAddItemComponent, ModalEventItemsComponent],
  providers: [AuthService, DataService, LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
