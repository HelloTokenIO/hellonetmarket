import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';

import { Approute } from './app.routes';
import { RouterModule } from '@angular/router';
import { AreachartComponent } from './areachart/areachart.component';
import { DatatableComponent } from './datatable/datatable.component'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpModule }      from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TopBarComponent,
    DashboardComponent,
    FooterComponent,
    LogoutComponent,
    UserComponent,
    AreachartComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(Approute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
