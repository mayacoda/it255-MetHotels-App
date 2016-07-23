import {Component} from "@angular/core";
import {HomePageComponent} from "./pages/home-page.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {HTTP_PROVIDERS} from "@angular/http";

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
    providers: [HTTP_PROVIDERS],
    directives: [NavigationComponent, HomePageComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {
    constructor() {

    }
}

