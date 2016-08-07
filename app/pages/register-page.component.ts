import {Component} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {Router} from "angular2/router";
import {ControlGroup, Control, FORM_DIRECTIVES, Validators} from "angular2/common";
import {UserService} from "../services/user.service";

@Component({
    selector: 'register-page',
    templateUrl: 'app/pages/register-page.component.html',
    directives: [FORM_DIRECTIVES]
})
export class RegisterPageComponent {
    registerForm:ControlGroup;
    invalidRegistration:boolean;
    userExists:boolean;
    registrationSuccess:boolean;

    constructor(private http:Http, private router:Router, private userService: UserService) {
        this.registerForm = new ControlGroup({
            firstName: new Control('', Validators.required),
            lastName: new Control('', Validators.required),
            email: new Control('', Validators.required),
            password: new Control('', Validators.required)
        });

        this.registerForm.valueChanges
            .subscribe(_ => {
                this.invalidRegistration = this.userExists = false;
            });
    }

    onRegisterUser(form:ControlGroup) {
        const headers = new Headers();
        const value = (<any> Object).assign(form.value, {register: true});

        this.http.post('http://it255.dev:8006/Hotels/pages/registration.php',
            JSON.stringify(value),
            {headers: headers}
        ).subscribe(res => {
            this.userService.setTokenAndUser(res.json().token, {email: form.value.email});
            this.registrationSuccess = true;
            setTimeout(() => {
                this.router.navigate(['/Home']);
            }, 2000);
        }, err => {
            if (err.status === 409) {
                this.userExists = true;
            } else {
                this.invalidRegistration = true;
            }
        });
    }
}