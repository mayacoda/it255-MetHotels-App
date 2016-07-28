import {Component} from "angular2/core";
import {HomePageComponent} from "./pages/home-page.component";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {RegisterPageComponent} from "./pages/register-page.component";
import {LoginPageComponent} from "./pages/login-page.component";
import {SearchPageComponent} from "./pages/search-page.component";


@Component({
    selector: 'app',
    template: `
        <navigation></navigation>
        
        <router-outlet></router-outlet>
    `,
    providers: [HTTP_PROVIDERS],
    directives: [NavigationComponent, HomePageComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'Home', component: HomePageComponent},
    {path: '/register', name: 'Register', component: RegisterPageComponent},
    {path: '/login', name: 'Login', component: LoginPageComponent},
    {path: '/search', name: 'Search', component: SearchPageComponent}
])
export class AppComponent {
    constructor() {

    }
}

