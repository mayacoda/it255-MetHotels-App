/// <reference path="../node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {AppComponent} from "./app.component";
import {
    APP_BASE_HREF,
    ROUTER_PROVIDERS,
    HashLocationStrategy,
    LocationStrategy,
} from "angular2/router";
import {provide} from "angular2/core";
import {bootstrap} from "angular2/bootstrap";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);