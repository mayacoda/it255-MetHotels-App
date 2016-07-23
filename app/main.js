"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_component_1 = require("./app.component");
var app_router_1 = require("./app.router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_router_1.appRouterProviders,
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
]);
//# sourceMappingURL=main.js.map