import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { FormsModule }           from '@angular/forms';
import { AppComponent }          from './app.component';
import { PasswordListComponent } from './password-list.component';
import { IPasswordService,
         MemoryPasswordService } from './password.service'
import { Password }              from './password';
import { routing }               from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        PasswordListComponent
    ],
    providers: [
        { provide: IPasswordService, useClass: MemoryPasswordService }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
