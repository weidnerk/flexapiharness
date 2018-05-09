import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule,  MatMenuModule, MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatPaginator, MatCheckboxModule, MatButtonModule, MatRadioModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule, MatFormFieldModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexService } from './_services/flex.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [FlexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
