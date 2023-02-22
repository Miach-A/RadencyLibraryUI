import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { BookModule } from './components/book.module';
import { BACKEND_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    BookModule,
  ],
  providers: [
    {provide:BACKEND_API_URL,useValue:environment.backendApi},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
