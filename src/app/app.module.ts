import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { Kpi1DataComponent } from './components/kpi1-data/kpi1-data.component';
import { Kpi2DataComponent } from './components/kpi2-data/kpi2-data.component';
import { Kpi3DataComponent } from './components/kpi3-data/kpi3-data.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,

    Kpi3DataComponent,
    Kpi2DataComponent,
    Kpi1DataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
