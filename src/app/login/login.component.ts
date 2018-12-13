import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {AuthService, GoogleLoginProvider, SocialUser} from 'ng4-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    public user: any = SocialUser;

    constructor(public router: Router, private socialAuthService: AuthService) {
    }

    ngOnInit() {
    }

    onLoggedIn() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
            this.user = userData;
            this.router.navigate(['/dashboard']);
            localStorage.setItem('username', this.user.name);
        });
    }

}
