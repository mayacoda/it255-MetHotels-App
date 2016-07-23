import {Component} from "@angular/core";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'register-page',
    templateUrl: 'register-page.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES]
})
export class RegisterPageComponent {
    registerForm: FormGroup;
    invalidRegistration: boolean;
    userExists: boolean;
    registrationSuccess: boolean;

    constructor(private formBuilder: FormBuilder, private http: Http, private router: Router) {
        this.registerForm = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required]]
        });

        this.registerForm.valueChanges
            .subscribe(_ => {
                this.invalidRegistration = this.userExists = false;
            });
    }

    onRegisterUser(form: FormGroup) {
        var headers = new Headers();
        const value = Object.assign(form.value, {register: true});

        this.http.post('http://it255.dev:8006/Hotels/pages/registration.php',
            value,
            {headers: headers}
        ).subscribe(res => {
                this.registrationSuccess = true;
                setTimeout(() => {
                    this.router.navigate(['login']);
                }, 4000);
            }, err => {
                if (err.status === 409) {
                    this.userExists = true;
                } else {
                    this.invalidRegistration = true;
                }
            });
    }
}