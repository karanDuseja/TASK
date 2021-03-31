import { DatapassingService } from './datapassing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DisplayformComponent } from './displayform/displayform.component';
import { FormComponent } from './form/form.component';
import { UpdateComponent } from './update/update.component';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DisplayformComponent,
    routingComponents,
    FormComponent,
    UpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    DatepickerModule.forRoot(),
    MomentModule,
    NgxPaginationModule,
    ToastrModule.forRoot()

    
  ],
  providers: [DatapassingService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
