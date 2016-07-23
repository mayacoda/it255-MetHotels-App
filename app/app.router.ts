import {provideRouter, RouterConfig} from '@angular/router';
import {HomePageComponent} from "./pages/home-page.component";
import {RegisterPageComponent} from "./pages/register-page.component";
import {LoginPageComponent} from "./pages/login-page.component";

const routes:RouterConfig = [
    {path: '', component: HomePageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'login', component: LoginPageComponent},
];

export const appRouterProviders = [
    provideRouter(routes)
];