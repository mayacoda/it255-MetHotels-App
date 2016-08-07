import {Injectable} from 'angular2/core';
import {Router} from "angular2/router";
import {User} from "../models/user.model";
import {Observable, BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class UserService {
    private user:BehaviorSubject<User>;

    constructor(private router:Router) {
        let prevState = null;
        // Authentication check,
        router.subscribe((state:string) => {
            if (prevState !== state) {
                prevState = state;
                if (localStorage.getItem('token') === null) {

                    // allow login and register pages to be active
                    if (state === 'register' || state === 'login' || /search/.test(state)) {
                        return;
                    }

                    router.navigate(['/Home']);
                    this.user.next(null);
                }
            }
        });

        const tempUser = localStorage.getItem('token') === null ? null : {email: "email"};

        this.user = new BehaviorSubject<User>(tempUser);
    }

    public getUser():Observable<User> {
        return this.user as Observable<User>;
    }

    public setTokenAndUser(token:string, user:User) {
        this.user.next(user);
        localStorage.setItem('token', token);
    }

    public removeToken() {
        this.user.next(null);
        this.router.navigate(['/Home']);
        localStorage.removeItem('token');
    }

}