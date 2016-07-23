import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {appRouterProviders} from "./app.router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {provideForms, disableDeprecatedForms} from "@angular/forms";

bootstrap(AppComponent, [
    appRouterProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    disableDeprecatedForms(),
    provideForms()
]);