import { Component, OnInit } from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login-page',
    templateUrl: 'login-page.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES]
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    invalidCredentials: boolean;
    loginSuccess: boolean;
    invalidLogin: boolean;

    constructor(private formBuilder: FormBuilder, private http: Http, private router: Router) {
        this.loginForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });


        this.loginForm.valueChanges
            .subscribe(_ => {
                this.invalidCredentials = this.invalidLogin = false;
            });
    }

    onLogin(form: FormGroup) {
        var headers = new Headers();
        const value = Object.assign(form.value, {login: true});

        this.http.post('http://it255.dev:8006/Hotels/pages/login.php',
            value,
            {headers: headers}
        ).subscribe(res => {
            this.loginSuccess = true;
            setTimeout(() => {
                this.router.navigate(['']);
            }, 4000);
        }, err => {
            if (err.status === 401) {
                this.invalidCredentials = true;
            } else {
                this.invalidLogin = true;
            }
        });
    }

    ngOnInit() { }

}