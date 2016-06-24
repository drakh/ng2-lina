"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var _1 = require('./app/');
var _2 = require('./app/shared/');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    _1.APP_ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    _2.AuthService,
    _2.DataService
])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map