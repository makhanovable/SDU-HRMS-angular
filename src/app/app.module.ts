import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {SearchService} from './layout/dashboard/search.service';
import {
    SocialLoginModule, AuthServiceConfig, GoogleLoginProvider
} from 'ng4-social-login';

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
            '824592970149-g0n6cmmrmph5l19lg6qpr0ht5v05ckt4.apps.googleusercontent.com')
    }
], false);

export function provideConfig() {
    return config;
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SocialLoginModule
    ],
    declarations: [AppComponent],
    providers: [
        {provide: AuthServiceConfig, useFactory: provideConfig},
        AuthGuard, SearchService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
