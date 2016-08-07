import {Component} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {Router} from "angular2/router";
import {ControlGroup, FORM_DIRECTIVES, Control, Validators} from "angular2/common";
import {UserService} from "../services/user.service";

@Component({
    selector: 'login-page',
    templateUrl: 'app/pages/login-page.component.html',
    directives: [FORM_DIRECTIVES]
})
export class LoginPageComponent {
    loginForm: ControlGroup;
    invalidCredentials: boolean;
    loginSuccess: boolean;
    invalidLogin: boolean;

    constructor(private http: Http, private router: Router, private userService: UserService) {
        this.loginForm = new ControlGroup({
            email: new Control('', Validators.required),
            password: new Control('', Validators.required)
        });

        this.loginForm.valueChanges
            .subscribe(_ => {
                this.invalidCredentials = this.invalidLogin = false;
            });
    }

    onLogin(form: ControlGroup) {
        const headers = new Headers();
        const value = (<any> Object).assign(form.value, {login: true});

        this.http.post('http://it255.dev:8006/Hotels/pages/login.php',
            JSON.stringify(value),
            {headers: headers}
        ).subscribe(res => {
            this.loginSuccess = true;
            this.userService.setTokenAndUser(res.json().token, {email: form.value.email});
            setTimeout(() => {
                this.router.navigate(['/Home']);
            }, 2000);
        }, err => {
            if (err.status === 401) {
                this.invalidCredentials = true;
            } else {
                this.invalidLogin = true;
            }
        });
    }
}