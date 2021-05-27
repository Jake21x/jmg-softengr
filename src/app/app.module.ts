import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { EmployeeComponent } from "./employee/employee.component";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WorkersService } from "./providers/workers.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
} from "@angular/material";
import { HeaderComponent } from "./header/header.component";
import { SearchPipePipe } from "./pipes/search-pipe.pipe";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    EmployeeComponent,
    DashboardComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: DashboardComponent },
      { path: "employee", component: EmployeeComponent },
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [WorkersService, SearchPipePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
