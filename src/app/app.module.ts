import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptors } from './shared/Interceptors';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, AppRoutingModule, CoreModule,RouterModule],
   providers: [
      [provideHttpClient(withInterceptors(interceptors))],
   ],
   bootstrap: [AppComponent],
})
export class AppModule { }
