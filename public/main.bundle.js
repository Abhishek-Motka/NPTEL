webpackJsonp([1,4],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//This service handles all the user related requests like authentication, registration and user management










var UserService = (function () {
    function UserService(http, router, flashMessage) {
        this.http = http;
        this.router = router;
        this.flashMessage = flashMessage;
        this.user = {};
        this.authToken = "";
        //To verify the validity of the token
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["JwtHelper"]();
        this.server = __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].BACKEND_SERVER;
    }
    //function to authenticate user
    UserService.prototype.authenticate = function (userCredentials) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.server + 'users/authenticate', JSON.stringify(userCredentials), { headers: headers }).map(function (res) { return res.json(); });
    };
    //function to save user data to the localStorage
    UserService.prototype.saveUserData = function (user, token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('id_token', token);
        this.user = user;
        this.authToken = token;
    };
    //to retrieve userdata from localStorage
    UserService.prototype.loadUserData = function () {
        return this.user = JSON.parse(localStorage.getItem('user'));
    };
    //to retrieve token from localStorage
    UserService.prototype.loadToken = function () {
        return this.authToken = localStorage.getItem('id_token');
    };
    //clear all data stored in the localStorage
    UserService.prototype.clearStorage = function () {
        localStorage.clear();
        this.user = "";
        this.authToken = "";
    };
    //to validate the expiration of the token
    UserService.prototype.validateToken = function () {
        this.authToken = this.loadToken();
        //If no token then user need to login so redirect to login page after clearing localstorage
        if (this.authToken === null || this.jwtHelper.isTokenExpired(this.authToken)) {
            this.clearStorage();
            this.authToken = "";
            this.user = null;
            this.flashMessage.show('Your session expired. Please login again.', { cssClass: 'alert-warning', timeout: 2000 });
            this.router.navigate(['/login']);
        }
    };
    //This function is used by auth-guards to validate the token
    UserService.prototype.isTokenValid = function () {
        var token = this.loadToken();
        if (!token)
            return false;
        if (token === null || this.jwtHelper.isTokenExpired(token)) {
            this.clearStorage();
            this.authToken = "";
            this.user = null;
            return false;
        }
        return true;
    };
    //Auth guards uses this function to verify the stored token with the server
    UserService.prototype.isLoggedIn = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.get(this.server + 'users/validate', { headers: headers }).map(function () { return true; }).catch(function (res) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(false);
        });
    };
    //Function to change password of current user
    UserService.prototype.changePassword = function (passwordObj) {
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.post(this.server + 'users/updatePassword', JSON.stringify(passwordObj), { headers: headers }).map(function (res) { return res.json(); });
    };
    //This function will log you out and will clear all localstorage data
    UserService.prototype.logout = function () {
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.get(this.server + 'users/logout', { headers: headers }).map(function (res) { return res.json(); });
    };
    // retrieve details of all users from the server
    UserService.prototype.getAllUsers = function () {
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.get(this.server + 'users/getAll', { headers: headers }).map(function (res) { return res.json(); });
    };
    UserService.prototype.getAllInstructors = function () {
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.get(this.server + 'users/getInstructors', { headers: headers }).map(function (res) { return res.json(); });
    };
    //function to add new user to the server
    UserService.prototype.addUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.post(this.server + 'users/register', JSON.stringify(user), { headers: headers }).map(function (res) { return res.json(); });
    };
    //function to retrieve userdetails by username
    UserService.prototype.getUserByUsername = function (username) {
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        params.set('username', username);
        return this.http.get(this.server + 'users/profile', { headers: headers, search: params }).map(function (res) { return res.json(); });
    };
    //get user details by the id of the user object in database
    UserService.prototype.getUser = function (id) {
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        params.set('id', id);
        return this.http.get(this.server + 'users/get', { headers: headers, search: params }).map(function (res) { return res.json(); });
    };
    //update details of the user
    UserService.prototype.updateUserDetails = function (newUser, username) {
        newUser.updateUsername = username;
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.post(this.server + 'users/update', JSON.stringify(newUser), { headers: headers }).map(function (res) { return res.json(); });
    };
    //delete user from the database
    UserService.prototype.deleteUser = function (username) {
        var reqBody = {
            username: username
        };
        this.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.delete(this.server + 'users/delete', { headers: headers, body: JSON.stringify(reqBody) }).map(function (res) { return res.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], UserService);

var _a, _b, _c;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 132:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 132;


/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(147);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FocusAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MoveAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MoveUpAnimation; });

var FocusAnimation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])("FocusPanel", [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        transform: 'scale(0.5)'
    })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
        transform: 'scale(1.0)'
    })),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('inactive => active', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('100ms ease-in')),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('active => inactive', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('100ms ease-out'))
]);
var MoveAnimation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])("MovePanel", [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])(450, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["keyframes"])([
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0, transform: 'translateX(100px)', offset: 0 }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0.4, transform: 'translateX(25px)', offset: .75 }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 1, transform: 'translateX(0)', offset: 1 })
        ]))
    ])
]);
var MoveUpAnimation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])("MoveUpPanel", [
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('void => *', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])(450, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["keyframes"])([
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0, transform: 'translateY(100px)', offset: 0 }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 0.4, transform: 'translateY(25px)', offset: .75 }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
    ])
]);
//# sourceMappingURL=my-animations.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_login_component__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_forget_password_forget_password_component__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_page_not_found_page_not_found_component__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_signup_signup_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_admin_admin_component__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_instructor_instructor_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_liveclass_liveclass_component__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_course_course_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
//Routing module for root components
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











//Routes that are used in root components
var routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_5__components_signup_signup_component__["a" /* SignupComponent */] },
    { path: 'instructor', component: __WEBPACK_IMPORTED_MODULE_7__components_instructor_instructor_component__["a" /* InstructorComponent */] },
    { path: 'class', component: __WEBPACK_IMPORTED_MODULE_8__components_liveclass_liveclass_component__["a" /* LiveclassComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'course', component: __WEBPACK_IMPORTED_MODULE_9__components_course_course_component__["a" /* CourseComponent */] },
    { path: 'forgotpassword/send', component: __WEBPACK_IMPORTED_MODULE_3__components_forget_password_forget_password_component__["a" /* ForgetPasswordComponent */], data: { send: true } },
    { path: 'forgotpassword/reset', component: __WEBPACK_IMPORTED_MODULE_3__components_forget_password_forget_password_component__["a" /* ForgetPasswordComponent */], data: { send: false } },
    { path: 'admin/user', component: __WEBPACK_IMPORTED_MODULE_6__components_admin_admin_component__["a" /* AdminComponent */], data: { showAddForm: false } },
    { path: 'admin/user/add', component: __WEBPACK_IMPORTED_MODULE_6__components_admin_admin_component__["a" /* AdminComponent */], data: { showAddForm: true } },
    /*
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //By default redirect to dashboard
    */
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_4__components_page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] } //If no path match go to 404
];
//Export router module so that other modules can use the directives offered by RoutingModule
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_navbar_navbar_component__ = __webpack_require__(89);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.title = 'app works!';
    }
    ;
    AppComponent.prototype.onActivate = function (component) {
        if (this.userService.isTokenValid()) {
            this.navbar.logIn();
        }
    };
    AppComponent.prototype.onDeactivate = function (component) {
        if (component.loggedIn) {
            this.navbar.logIn();
        }
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('navbar'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__components_navbar_navbar_component__["a" /* NavbarComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__components_navbar_navbar_component__["a" /* NavbarComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "navbar", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(239),
        styles: [__webpack_require__(219)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_pagination__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_navbar_navbar_component__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_login_login_component__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_forget_password_forget_password_component__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_password_reset_service__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_lstream_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_instructor_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_online_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_page_not_found_page_not_found_component__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_signup_signup_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_admin_admin_component__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pipes_user_filter_pipe__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_instructor_instructor_component__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_liveclass_liveclass_component__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_course_course_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_home_home_component__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng_socket_io__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__app_config__ = __webpack_require__(25);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var config = { url: __WEBPACK_IMPORTED_MODULE_27__app_config__["a" /* Config */].SOCKET_SERVER_URL, options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_forget_password_forget_password_component__["a" /* ForgetPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_signup_signup_component__["a" /* SignupComponent */],
            __WEBPACK_IMPORTED_MODULE_20__components_admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_21__pipes_user_filter_pipe__["a" /* UserFilterPipe */],
            __WEBPACK_IMPORTED_MODULE_22__components_instructor_instructor_component__["a" /* InstructorComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_liveclass_liveclass_component__["a" /* LiveclassComponent */],
            __WEBPACK_IMPORTED_MODULE_24__components_course_course_component__["a" /* CourseComponent */],
            __WEBPACK_IMPORTED_MODULE_25__components_home_home_component__["a" /* HomeComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_7_angular2_flash_messages__["FlashMessagesModule"],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_8_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_26_ng_socket_io__["SocketIoModule"].forRoot(config)
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7_angular2_flash_messages__["FlashMessagesService"],
            __WEBPACK_IMPORTED_MODULE_13__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_14__services_password_reset_service__["a" /* PasswordResetService */],
            __WEBPACK_IMPORTED_MODULE_15__services_lstream_service__["a" /* LstreamService */],
            __WEBPACK_IMPORTED_MODULE_16__services_instructor_service__["a" /* InstructorService */],
            __WEBPACK_IMPORTED_MODULE_17__services_online_service__["a" /* OnlineService */],
            { provide: __WEBPACK_IMPORTED_MODULE_5__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_5__angular_common__["HashLocationStrategy"] }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFilterPipe; });
//pipe to filter user data by different fields provided in html template
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UserFilterPipe = (function () {
    function UserFilterPipe() {
    }
    UserFilterPipe.prototype.transform = function (items, filter) {
        if (!items || !filter)
            return items;
        return items.filter(function (user) {
            var ans = true;
            if (filter.name) {
                var name = user.firstname + " " + user.lastname;
                if (name.toLowerCase().indexOf(filter.name.toLowerCase()) < 0)
                    ans = false;
            }
            if (filter.username) {
                if (user.username.toLowerCase().indexOf(filter.username.toLowerCase()) < 0)
                    ans = false;
            }
            if (filter.email) {
                if (user.email.toLowerCase().indexOf(filter.email.toLowerCase()) < 0)
                    ans = false;
            }
            return ans;
        });
    };
    return UserFilterPipe;
}());
UserFilterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'userFilter'
    })
], UserFilterPipe);

//# sourceMappingURL=user-filter.pipe.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "td {\r\n  text-transform: capitalize;\r\n  vertical-align: middle;\r\n  line-height: 1.5em;\r\n  font-size: 0.93em;\r\n}\r\n\r\ntd .glyphicon {\r\n  margin: auto 15px;\r\n  text-align: center;\r\n  font-size: 1.30em;\r\n}\r\n\r\n.container-fluid {\r\n  padding: 15px;\r\n  margin: 15px;\r\n}\r\n\r\n.body-container label {\r\n  font-size: 0.9em;\r\n}\r\n\r\n.btn-primary:hover, .btn-primary:active, .btn-primary:focus {\r\n\tbackground: #18a689;\r\n\tborder-color: #18a689;\r\n\toutline: none;\r\n}\r\n\r\n.label-container {\r\n  text-align: right;\r\n}\r\n\r\nselect {\r\n  padding: 5px;\r\n  padding-left: 10px;\r\n  width: 90%;\r\n}\r\n\r\nbutton {\r\n  padding: 10px 35px;\r\n  margin-right: 15px;\r\n}\r\n\r\n.img-button:active, .img-button::-moz-selection {\r\n  transform: scale(0.90, 0.90);\r\n}\r\n\r\n.img-button:active, .img-button::selection {\r\n  -webkit-transform: scale(0.90, 0.90);\r\n          transform: scale(0.90, 0.90);\r\n}\r\n\r\nbutton:disabled {\r\n  cursor: not-allowed;\r\n}\r\n\r\ntbody {\r\n  overflow-y: scroll;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".row{\r\n\tmargin-top: 50px;\r\n\tmargin-left: 0px;\r\n\tpadding: 0;\r\n}\r\n\r\nimg{\r\n\twidth: 100%;\r\n\theight: 150px;\r\n\talign:right;\r\n}\r\n\r\n.col-sm-3{\r\n\tmargin-left: 20px;\r\n\tmargin-right: 10px;\r\n\tbox-shadow: 5px 5px 5px #888888;\r\n   margin-bottom: 10px;\r\n\tdisplay: l5k;\r\n\tbackground-color: white;\r\n\tpadding: 0;\r\n}\r\n\r\n.Cname{\r\n\tpadding-top: 16px;\r\n\tpadding-bottom: 50px;\r\n\ttext-align: center;\r\n\tfont-size: 16px;\r\n\tfont-family: roboto;\r\n\tcolor: #6A6969;\r\n}\r\n\r\n.list-group-item{\r\n\twidth:240px; height:65px;\r\n\tfont-family: roboto;\r\n\tfont-size: 16px;\r\n}\r\n\r\n\r\n.courses{\r\n\theight: 500px;\r\n\toverflow: auto;\r\n\toverflow-x: hidden;\r\n\toverflow-y: scroll;\r\n}\r\nbody{\r\n\tbackground-color: #F0F7F7;\r\n}\r\n\r\ninput {\r\n  width: auto;\r\n}\r\n\r\n.form-control{display:block;width:100%;height:39px;\r\n\tpadding:8px 12px;font-size:15px;line-height:1.4;\r\n\tcolor:#6f6f6f;background-color:#ffffff;background-image:none;\r\n\tborder:1px solid #cccccc;border-radius:0;\r\n}\r\n\r\n.col-sm-10{\r\n\tmargin-bottom: 25px;\r\n\tmargin-top: 0px;\r\n}\r\n\r\n.dispname{\r\n\twidth: 100%;\r\n\theight: 30px;\r\n\tfont-style: roboto;\r\n\tfont-size: 16px;\r\n\tcolor: #6A6969;\r\n}\r\n\r\n.dispname input{\r\n\tmargin-right:10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".mainContainer {\r\n\tmargin: 15% 15%;\r\n\tbackground: white;\r\n\tpadding: 30px;\r\n\tbox-shadow: lightgray 1px 1px 4px 1px;\r\n}\r\n\r\n.inputContainer {\r\n\tborder: 1px solid lightgray;\r\n\tmargin: 0;\r\n\tpadding: 2px 0;\r\n}\r\n\r\n.btn {\r\n\tpadding: 4px;\r\n\tmargin: 0;\r\n}\r\n\r\n.btn-primary:hover, .btn-primary:active, .btn-primary:focus {\r\n\tbackground: #18a689;\r\n\tborder-color: #18a689;\r\n\toutline: none;\r\n}\r\n\r\nimg {\r\n\tpadding: 2px 5px;\r\n\twidth: 100%;\r\n}\r\n\r\ninput {\r\n\tborder: none;\r\n\tmargin: 0 10px;\r\n\tpadding: 2px 6px;\r\n\tline-height: 1.8em;\r\n\twidth: 100%;\r\n\tbox-shadow: none;\r\n}\r\n\r\n:focus, :active, :hover {\r\n\toutline: none;\r\n}\r\n\r\nhr {\r\n  margin-top: 5px;\r\n}\r\n\r\nform {\r\n\tpadding: 10px;\r\n  margin-top: 0;\r\n}\r\n\r\n.form-group {\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.body-container {\r\n  margin-bottom: 0;\r\n  padding-bottom: 0;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "html {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\nbody {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\n.homeImage{\r\n\tpadding-bottom: 28%;\r\n\twidth: 100%;\r\n\tbackground-image:url(" + __webpack_require__(288) + ");\r\n\tposition: relative;\r\n  background-size: cover;\r\n\tmargin-bottom: 50px;\r\n}\r\n\r\n.info{\r\n\tfont-style: roboto;\r\n\tcolor: #818787;\r\n}\r\n\r\n.row{\r\n\twidth: 100%;\r\n\tpadding-top:50px;\r\n\tmargin-left: 0px;\r\n\tpadding: 0;\r\n}\r\n\r\n\r\n.col-sm-3{\r\n\talign:right;\r\n\tmargin-left: 20px;\r\n\tmargin-right: 0px;\r\n\tbox-shadow: 5px 5px 5px #888888;\r\n   margin-bottom: 10px;\r\n\tdisplay: l5k;\r\n\tbackground-color: white;\r\n\tpadding: 0;\r\n\tmargin-top: 0px;\r\n\tborder-radius: 10px;\r\n}\r\n\r\n.col-sm-1{\r\n\twidth: 80px;\r\n}\r\n\r\n.Cname{\r\n\tpadding-top: 16px;\r\n\tpadding-bottom: 50px;\r\n\ttext-align: center;\r\n\tfont-size: 16px;\r\n\tfont-family: roboto;\r\n\tcolor: #6A6969;\r\n}\r\nimg{\r\n\twidth: 100%;\r\n\theight: 100px;\r\n\talign:right;\r\n\tborder-top-right-radius: 10px;\r\n\tborder-top-left-radius: 10px;\r\n}\r\n\r\nli{\r\n\ttext-decoration:none;\r\n\tpadding:11px 0px;\r\n\tmargin-bottom: 0;\r\n\tborder-bottom: 1px solid #efefef;\r\n}\r\n\r\nul{\r\n\tlist-style-type: circle;\r\n\theight: /*679px;*/ 646px;\r\n\toverflow: auto;\r\n\toverflow-x: hidden;\r\n\toverflow-y: scroll;\r\n\tpadding-right: 20px;\r\n}\r\n\r\n.heading{\r\n\tmargin-top: 35px;\r\n \ttext-align: center;\r\n\tfont-size: 2.5em;\r\n\tcolor: gray;\r\n\tletter-spacing: 3px;\r\n\tfont-weight: lighter;\r\n \tfont-family: \"Segoe UI\", Verdana, sans-serif;\r\n}\r\n\r\n.form-control{\r\n\tmargin-bottom: 20px;\r\n}\r\n\r\n\r\n.wrapper {\r\n    text-align: center;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".chatbox {\r\n  resize: none;\r\n  padding: 10px;\r\n  padding-bottom: 0;\r\n  margin-bottom: 0;\r\n  width: 100%;\r\n  height: 200px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".row {\r\n  width: 100%;\r\n}\r\n\r\n.chatbox {\r\n  resize: none;\r\n  padding: 10px;\r\n  padding-bottom: 0;\r\n  margin-bottom: 0;\r\n  width: 100%;\r\n  height: 225px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".mainContainer {\r\n\tmargin: 15% 15%;\r\n\tbackground: white;\r\n\tpadding: 30px;\r\n\tbox-shadow: lightgray 1px 1px 4px 1px;\r\n}\r\n\r\n.inputContainer {\r\n\tborder: 1px solid lightgray;\r\n\tmargin: 0;\r\n\tpadding: 2px 0;\r\n}\r\n\r\n.btn {\r\n\tpadding: 4px;\r\n\tmargin: 0;\r\n}\r\n\r\n.btn-primary:hover, .btn-primary:active, .btn-primary:focus {\r\n\tbackground: #18a689;\r\n\tborder-color: #18a689;\r\n\toutline: none;\r\n}\r\n\r\nimg {\r\n\tpadding: 2px 5px;\r\n\twidth: 100%;\r\n}\r\n\r\ninput {\r\n\tborder: none;\r\n\tmargin: 0 10px;\r\n\tpadding: 2px 8px;\r\n\tline-height: 2.0em;\r\n\twidth: 100%;\r\n\tbox-shadow: none;\r\n}\r\n\r\n:focus, :active, :hover {\r\n\toutline: none;\r\n}\r\n\r\nform {\r\n\tpadding: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".navbar {\r\n  width: 100%;\r\n  height: 65px;\r\n  z-index: 1000;\r\n  background: white;\r\n  padding: 10px;\r\n  box-shadow: lightgrey 1px 1px 15px 1px;\r\n}\r\n\r\n.vc {\r\n  height: 45px;\r\n  line-height: 45px;\r\n}\r\n\r\n.nav-item {\r\n  font-size: 1.1em;\r\n  text-align: center;\r\n}\r\n\r\n.nav-item:hover {\r\n  color: #029FCB;\r\n  border: 1px solid lightgrey;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".mainContainer {\r\n\tmargin: 5% 15%;\r\n\tbackground: white;\r\n\tpadding: 30px;\r\n\tbox-shadow: lightgray 1px 1px 4px 1px;\r\n}\r\n\r\n.inputContainer {\r\n\tborder: 1px solid lightgray;\r\n\tmargin: 0;\r\n\tpadding: 2px 0;\r\n}\r\n\r\n.btn {\r\n\tpadding: 4px;\r\n\tmargin: 0;\r\n}\r\n\r\n.btn-primary:hover, .btn-primary:active, .btn-primary:focus {\r\n\tbackground: #18a689;\r\n\tborder-color: #18a689;\r\n\toutline: none;\r\n}\r\n\r\nimg {\r\n\tpadding: 2px 5px;\r\n\twidth: 100%;\r\n}\r\n\r\ninput {\r\n\tborder: 1px solid #AAA;\r\n\tmargin: 0 10px;\r\n\tpadding: 5px 8px;\r\n\tline-height: 2.0em;\r\n\twidth: 100%;\r\n\tbox-shadow: none;\r\n}\r\n\r\n.row {\r\n  margin: 25px 0px;\r\n}\r\n\r\n:focus, :active, :hover {\r\n\toutline: none;\r\n}\r\n\r\nform {\r\n\tpadding: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 239:
/***/ (function(module, exports) {

module.exports = "<flash-messages></flash-messages>\n<app-navbar #navbar></app-navbar>\n<router-outlet (deactivate) = \"onDeactivate($event)\" (activate)=\"onActivate($event)\"></router-outlet>\n"

/***/ }),

/***/ 240:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\" [@FocusPanel]='state' [@MoveUpPanel]='state' *ngIf=\"!showAddForm\">\n  <div class=\"box-container\" style=\"padding: 20px;\">\n    <div class=\"heading-container\">\n      <strong style=\"font-size: 0.95em;\">Instructor Management</strong>\n    </div>\n    <hr />\n    <div class=\"heading-container\" style=\"margin-bottom: 5px;\">\n      <div class=\"push-button clickable\" style=\"padding: 5px; width: 180px; border-radius: 4px; border: 1px solid lightgrey;\"  (click)=\"onAddUserClick()\">\n        <label style=\"margin-right: 5px; margin-left: 10px;\"><img src=\"./assets/img/user.png\" width=\"30px\" class=\"img-button clickable\" style=\"cursor: pointer;\"/></label>\n        Add Instructor\n      </div>\n    </div>\n    <hr style=\"margin-top: 0;\" />\n    <div class=\"body-container\">\n      <div class=\"table-responsive\">\n        <table class=\"table table-striped\">\n          <thead>\n            <tr>\n              <th>\n                Name\n              </th>\n              <th>\n                Username\n              </th>\n              <th>\n                Email Id\n              </th>\n              <th>\n                Mobile\n              </th>\n              <th>\n              </th>\n              <th>\n                Delete\n              </th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>\n                <input type=\"text\" placeholder=\"Name\" name=\"name\" ngModel [(ngModel)]=\"filter.name\"/>\n              </td>\n              <td>\n                <input type=\"text\" placeholder=\"Username\" name=\"username\" ngModel [(ngModel)]=\"filter.username\"/>\n              </td>\n              <td>\n                <input type=\"email\" placeholder=\"Email Id\" name=\"email\" ngModel [(ngModel)]=\"filter.email\"/>\n              </td>\n              <td></td>\n              <td></td>\n              <td></td>\n            </tr>\n            <tr *ngFor=\"let user of users | userFilter: {name: filter.name, username: filter.username, email: filter.email} | paginate: {itemsPerPage: listLimit, currentPage: page}\">\n              <td>\n                {{user.firstname}} {{user.lastname}}\n              </td>\n              <td>\n                {{user.username}}\n              </td>\n              <td style=\"text-transform: lowercase;\">\n                {{user.email}}\n              </td>\n              <td>\n                {{user.mobile}}\n              </td>\n              <td>\n\n              </td>\n              <td>\n                <span class=\"glyphicon glyphicon-trash icon-small\" (click)=\"onDeleteClick(user)\"></span>\n              </td>\n            </tr>\n            <tr style=\"visibility: hidden; height: 0px;\">\n              <td>\n                Abhishek Patel\n              </td>\n              <td>\n                adpatel3697\n              </td>\n              <td>\n                adpateladpatel@gmail.com\n              </td>\n              <td>\n                886666666666\n              </td>\n              <td>\n\n              </td>\n              <td>\n                <span class=\"glyphicon glyphicon-trash icon-small\" (click)=\"onDeleteClick(user)\"></span>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <div *ngIf=\"users.length > limits[0]\">\n          <div class=\"pull-left\">\n            <label>Show </label>\n          </div>\n          <select class=\"input-control pull-left\" style=\"width: auto; margin:auto 10px; padding: 2px 5px;\" name=\"show\" [(ngModel)] =\"listLimit\" required>\n            <option *ngFor=\"let limit of limits\" [value]=\"limit\">\n              {{limit}}\n            </option>\n          </select>\n          <div class=\"pull-left\">\n            <label>Entries</label>\n          </div>\n          <div class=\"pull-right\">\n            <pagination-controls (pageChange) = \"page = $event\" maxSize=\"6\" previousLabel=\"Prev\"></pagination-controls>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"container-fluid box-container\" [@FocusPanel]='state' [@MovePanel]='state' *ngIf=\"showAddForm\">\n  <div class=\"heading-container\">\n    <label>Add New Instructor</label>\n  </div>\n  <hr />\n  <div class=\"body-container\">\n    <form #userForm ='ngForm' (ngSubmit)=\"onSubmit(userForm)\">\n      <div class=\"form-group row\">\n        <div class=\"col-md-3 label-container\">\n            <label>First Name</label>\n        </div>\n        <div class=\"col-md-6\">\n            <input type=\"text\" name=\"fname\" class=\"input-control\" #fName='ngModel' minlength = \"3\" ngModel [(ngModel)] =\"newUser.fName\" [class.input-error] = \"fName.errors && (fName.dirty || fName.touched)\" pattern='[a-zA-Z]*' required/>\n            <div *ngIf = \"fName.errors && (fName.dirty || fName.touched)\" class=\"formControlError\">\n              <div [hidden] = \"!fName.errors.required\">\n                This field is required\n              </div>\n              <div [hidden] = \"fName.errors.required || !fName.errors.minlength\">\n                Enter at least 3 characters.\n              </div>\n              <div [hidden] = \"fName.errors.required || fName.errors.minlength || !fName.errors.pattern\">\n                Only alphabetic charaters allowed.\n              </div>\n            </div>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-md-3 label-container\">\n            <label>Last Name</label>\n        </div>\n        <div class=\"col-md-6\">\n          <input type=\"text\" name=\"lName\" pattern=\"[a-zA-Z]*\" class=\"input-control\" #lName='ngModel' minlength = \"3\" ngModel [(ngModel)] =\"newUser.lName\" [class.input-error] = \"lName.errors && (lName.dirty || lName.touched)\" required/>\n          <div *ngIf = \"lName.errors && (lName.dirty || lName.touched)\" class=\"formControlError\">\n            <div [hidden] = \"!lName.errors.required\">\n              This field is required\n            </div>\n            <div [hidden] = \"lName.errors.require || !lName.errors.minlength\">\n              Enter at least 3 characters.\n            </div>\n            <div [hidden] = \"lName.errors.require || lName.errors.minlength || !lName.errors.pattern\">\n              Only alphabetic characters allowed.\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-md-3 label-container\">\n            <label>Username</label>\n        </div>\n        <div class=\"col-md-6\">\n          <input type=\"text\" name=\"username\" class=\"input-control\" #username='ngModel' minlength = \"3\" ngModel [(ngModel)] =\"newUser.username\" [class.input-error] = \"username.errors && (username.dirty || username.touched)\" required/>\n          <div *ngIf = \"username.errors && (username.dirty || username.touched)\" class=\"formControlError\">\n            <div [hidden] = \"!username.errors.required\">\n              This field is required\n            </div>\n            <div [hidden] = \"username.errors.require || !username.errors.minlength\">\n              Enter at least 3 characters.\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-md-3 label-container\">\n            <label>Email</label>\n        </div>\n        <div class=\"col-md-6\">\n          <input type=\"email\" name=\"email\" class=\"input-control\" #email='ngModel' ngModel [(ngModel)] =\"newUser.email\" [class.input-error] = \"email.errors && (email.dirty || email.touched)\" email required/>\n          <div *ngIf = \"email.errors && (email.dirty || email.touched)\" class=\"formControlError\">\n            <div [hidden] = \"!email.errors.required\">\n              This field is required\n            </div>\n            <div [hidden] = \"email.errors.require || !email.errors.email\">\n              Enter valid Email address.\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-md-3 label-container\">\n            <label>Mobile</label>\n        </div>\n        <div class=\"col-md-6\">\n          <input type=\"text\" name=\"mobile\" pattern=\"[0-9]*\" class=\"input-control\" #mobile='ngModel' minlength = \"9\" maxlength=\"13\" ngModel [(ngModel)] =\"newUser.mobile\" [class.input-error] = \"mobile.errors && (mobile.dirty || mobile.touched)\" required/>\n          <div *ngIf = \"mobile.errors && (mobile.dirty || mobile.touched)\" class=\"formControlError\">\n            <div [hidden] = \"!mobile.errors.required\">\n              This field is required\n            </div>\n            <div [hidden] = \"mobile.errors.require || !mobile.errors.minlength || !mobile.errors.maxlength\">\n              Enter mobile number of length 9 to 13.\n            </div>\n            <div [hidden] = \"mobile.errors.require || mobile.errors.minlength || mobile.errors.maxlength || !mobile.errors.pattern\">\n              Only Digits are allowed.\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-md-3 label-container\">\n            <label>User Password</label>\n        </div>\n        <div class=\"col-md-6\">\n          <input type=\"password\" [disabled]=\"updateUser\" name=\"newPassword\" class=\"input-control\" #newPassword='ngModel' minlength = \"8\" ngModel [(ngModel)] =\"newUser.password\" [class.input-error] = \"newPassword.errors && (newPassword.dirty || newPassword.touched)\" required/>\n          <div *ngIf = \"newPassword.errors && (newPassword.dirty || newPassword.touched)\" class=\"formControlError\">\n            <div [hidden] = \"!newPassword.errors.required\">\n              This field is required\n            </div>\n            <div [hidden] = \"newPassword.errors.require || !newPassword.errors.minlength\">\n              Enter at least 8 characters.\n            </div>\n          </div>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n      <div class=\"form-group row\">\n        <div class=\"col-md-3 label-container\">\n            <label>Retype Password</label>\n        </div>\n        <div class=\"col-md-6\">\n          <input type=\"password\" [disabled]=\"updateUser\" name=\"confirmPassword\" class=\"input-control\" [(ngModel)] = 'newUser.confirmPassword' #confirmPassword='ngModel' minlength = \"8\" ngModel [class.input-error] = \"(confirmPassword.errors || (confirmPassword.value !== newPassword.value)) && (confirmPassword.dirty || confirmPassword.touched)\" required/>\n          <div *ngIf = \"confirmPassword.errors && (confirmPassword.dirty || confirmPassword.touched)\" class=\"formControlError\">\n            <div [hidden] = \"!confirmPassword.errors.required\">\n              This field is required\n            </div>\n            <div [hidden] = \"confirmPassword.errors.required || !confirmPassword.errors.minlength\">\n              Enter at least 8 characters.\n            </div>\n          </div>\n          <div *ngIf = \"!confirmPassword.errors && (confirmPassword.dirty || confirmPassword.touched) && (confirmPassword.value !== newPassword.value)\" class=\"formControlError\">\n            This Password must match with new Password.\n          </div>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n      <hr class=\"hr-dashed\" />\n      <div class=\"form-group row\">\n        <div class=\"col-md-3\"></div>\n        <div class=\"col-md-6\">\n            <button type=\"submit\" class=\"button button-pri push-button\" [disabled] = \"userForm.invalid || (newPassword.value !== confirmPassword.value)\">Submit</button>\n            <button type=\"button\" class=\"button button-dan push-button\" (click)=\"onCancelClick(userForm)\">Cancel</button>\n        </div>\n        <div class=\"col-md-3\"></div>\n      </div>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

module.exports = "\n\t\t<div class=\"row\" >\n\t\t\t<div class=\"col-sm-2\" style=\"padding-top:50px;\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-info\" style=\"margin-left:15px; margin-bottom:15px;padding-right:112px; font-family:roboto; font-size: 16px; align:center;\" data-toggle=\"collapse\" data-target=\"#demo\">List By Discipline</button>\n\t\t\t\t<div id=\"demo\" class=\"collapse\" >\n\t\t\t\t\t<div id=\"discipline\" class=\"showlist panel-collapse collapse in\">\n\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t<ul class=\"list-group displist\" style=\"width:240px; height:300px;overflow-x: hidden;overflow-y: scroll;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\n\t\t\t\t\t\t\t\t<div class=\"dispname\" style=\"padding-left:0px;\"><input type=\"checkbox\" class=\"ccheck checkAgriculture\" name=\"agriculture\" value=\"126\">Aerospace Engineering</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\n\t\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkAgriculture\" name=\"agriculture\" value=\"126\">\n\t\t\t\t\t\t\t\tAgriculture</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkArchitecture\" name=\"architecture\" value=\"124\">\n\t\t\t\t\t\t\t\tArchitecture</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkAtmosphericScience\" name=\"atmospheric science\" value=\"119\">\n\t\t\t\t\t\t\t\tAtmospheric Science</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkAutomobileEngineering\" name=\"automobile engineering\" value=\"125\">\n\t\t\t\t\t\t\t\tAutomobile Engineering</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkBasiccourses(Sem1and2)\" name=\"basic courses(sem 1 and 2)\" value=\"122\">\n\t\t\t\t\t\t\t\tBasic courses(Sem 1 and 2)</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkBiotechnology\" name=\"biotechnology\" value=\"102\">\n\t\t\t\t\t\t\t\tBiotechnology</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkChemicalEngineering\" name=\"chemical engineering\" value=\"103\">\n\t\t\t\t\t\t\t\tChemical Engineering</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkChemistryandBiochemistry\" name=\"chemistry and biochemistry\" value=\"104\">\n\t\t\t\t\t\t\t\tChemistry and Biochemistry</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkCivilEngineering\" name=\"civil engineering\" value=\"105\">\n\t\t\t\t\t\t\tCivil Engineering</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkComputerScienceandEngineering\" name=\"computer science and  engineering\" value=\"106\">\n\t\t\t\t\t\t\t\tComputer Science and  Engineering</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkElectricalEngineering\" name=\"electrical engineering\" value=\"108\">\n\t\t\t\t\t\t\tElectrical Engineering</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkElectronics&amp;CommunicationEngineering\" name=\"electronics &amp; communication engineering\" value=\"117\">\n\t\t\t\t\t\t\t\tElectronics &amp; Communication Engineering</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkEngineeringDesign\" name=\"engineering design\" value=\"107\">\n\t\t\t\t\t\t\t\tEngineering Design</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkEnvironmentalScience\" name=\"environmental science\" value=\"120\">\n\t\t\t\t\t\t\t\tEnvironmental Science</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkGeneral\" name=\"general\" value=\"121\">\n\t\t\t\t\t\t\t\tGeneral</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkHumanitiesandSocialSciences\" name=\"humanities and social sciences\" value=\"109\">\n\t\t\t\t\t\t\t\tHumanities and Social Sciences</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkManagement\" name=\"management\" value=\"110\">\n\t\t\t\t\t\t\t\tManagement</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t  </ul>\n\t\t\t\t\t</div>\n\t\t\t </div>\n\t\t\t\t</div>\n\t\t\t\t<br />\n\n\n\n\t\t\t\t<button type=\"button\" class=\"btn btn-info\" style=\"margin-left:15px;margin-bottom:15px;padding-right:92px; font-family:roboto; font-size: 16px; align:center;\" data-toggle=\"collapse\" data-target=\"#dem\">List By Content Type</button>\n \t\t\t\t<div id=\"dem\" class=\"collapse\" >\n\t\t\t\t\t<li class=\"list-group-item\" style=\"margin-left:15px;\">\n\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkHumanitiesandSocialSciences\" name=\"humanities and social sciences\" value=\"109\">\n\t\t\t\t\t\tVideo Course</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t<li class=\"list-group-item\" style=\"margin-left:15px;\">\n\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkManagement\" name=\"management\" value=\"110\">\n\t\t\t\t\t\tWeb Course</div>\n\t\t\t\t\t\t</li>\n \t\t\t\t</div>\n\t\t\t\t<br />\n\n\t\t\t\t<button type=\"button\" class=\"btn btn-info\" style=\"margin-left:15px;margin-bottom:15px;padding-right:112px; font-family:roboto; font-size: 16px; align:center;\" data-toggle=\"collapse\" data-target=\"#demmo\">List By Institution</button>\n \t\t\t\t<div id=\"demmo\" class=\"collapse\" >\n\t\t\t\t\t<li class=\"list-group-item\" style=\"margin-left:15px;\">\n\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkHumanitiesandSocialSciences\" name=\"humanities and social sciences\" value=\"109\">\n\t\t\t\t\t\tIIT Delhi</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t<li class=\"list-group-item\" style=\"margin-left:15px;\">\n\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkManagement\" name=\"management\" value=\"110\">\n\t\t\t\t\t\tIIT Khadakpur</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"list-group-item\" style=\"margin-left:15px;\">\n\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkHumanitiesandSocialSciences\" name=\"humanities and social sciences\" value=\"109\">\n\t\t\t\t\t\t\tIIT Bombay</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"list-group-item\" style=\"margin-left:15px;\">\n\t\t\t\t\t\t\t<div class=\"dispname\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"ccheck checkManagement\" name=\"management\" value=\"110\">\n\t\t\t\t\t\t\tIIT Ganghinagar</div>\n\t\t\t\t\t\t\t</li>\n \t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-sm-10\" >\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"row\" >\n\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t<form  name=\"searchform\" style=\"width:100%; \">\n\t\t\t\t\t\t\t\t<input type=\"text\" name=\"cssearch\"  class=\"form-control\" placeholder=\"Search for Coursename,Professor,Institute\" autocomplete=\"off\">\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"courses\" >\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/1.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Deep learning foundation</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3  push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/2.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Astronomy </label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3  push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/3.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Nano Science</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/4.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Deep learning foundation</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/5.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Nanotechnology </label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/6.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Machine learning</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/7.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Deep learning foundation</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/8.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Machine learning </label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/9.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Puzzle</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/10.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Deep learning foundation</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/11.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Synthetic Biology</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t\t<img src=\"./assets/img/12.jpg\" /><br />\n\t\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t\t<label>Android Faundation</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n"

/***/ }),

/***/ 242:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" [@FocusPanel]='state' [@MovePanel]='state'>\n\t<div class=\"row mainContainer\"  *ngIf=\"send\">\n\t\t<div class=\"col-md-6\">\n\t\t\t<img src=\"./assets/img/logo.jpg\" />\n\t\t</div>\n\n\t\t<div class=\"col-md-6\">\n      <div class=\"heading-container\" style=\"text-align: center;\">\n        Forgot Password? <span class=\"glyphicon glyphicon-menu-left pull-right\" style=\"font-size: 2.0em; cursor: pointer;\" (click) =\"onBackClick()\"></span>\n      </div>\n      <hr />\n      <div class=\"body-container\">\n        Enter your email address and your password reset link will be emailed to you.\n      </div>\n\t\t\t<form #forgetPasswordForm = \"ngForm\" (ngSubmit) = \"onFormSubmit(forgetPasswordForm)\" novalidate>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t<div class=\"row col-xs-10 inputContainer\">\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-xs-1 imgContainer\">\n\t\t\t\t\t\t\t\t\t<img src=\"./assets/img/@.png\" style=\"width: 35px;\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xs-10\">\n\t\t\t\t\t\t\t\t\t<input ngModel #email = 'ngModel' type=\"email\" placeholder=\"Enter You Email\" name=\"email\" [(ngModel)] = 'user.email' required email />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t<div class=\"col-xs-10\" style=\"margin: 0px; padding: 0px;\">\n\t\t\t\t\t\t\t<div *ngIf = \"email.errors && (email.dirty || email.touched)\" class=\"formControlError\">\n\t\t\t\t\t\t\t\t<div [hidden] = \"!email.errors.required\">\n\t\t\t\t\t\t\t\t\tThis field is required\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div [hidden] = \"email.errors.required || !email.errors.email\">\n\t\t\t\t\t\t\t\t\tInvalid Email Address\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t\t<button type=\"submit\" [disabled] = \"forgetPasswordForm.invalid\" class=\"col-xs-10 btn btn-primary\">Send Reset Link</button>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n  <div class=\"row mainContainer\" *ngIf=\"!send\">\n\t\t<div class=\"col-md-6\">\n\t\t\t<img src=\"./assets/img/logo.jpg\" />\n\t\t</div>\n    <div class=\"col-md-6\">\n      <div class=\"heading-container\" style=\"text-align: center\">\n        Reset Password\n      </div>\n      <hr />\n      <form #resetPasswordForm = \"ngForm\" (ngSubmit) = \"onResetFormSubmit(resetPasswordForm)\" novalidate>\n          <div class=\"form-group\">\n  \t\t\t\t\t<div class=\"row\">\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t\t<div class=\"row col-xs-10 inputContainer\">\n  \t\t\t\t\t\t\t<div class=\"row\">\n  \t\t\t\t\t\t\t\t<div class=\"col-xs-1 imgContainer\">\n  \t\t\t\t\t\t\t\t\t<img src=\"./assets/img/login_2.png\" style=\"width: 40px;\"/>\n  \t\t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t\t\t<div class=\"col-xs-10\">\n                    <input type=\"password\" name=\"newPassword\" #newPassword='ngModel' placeholder=\"New Password\" minlength = \"8\" ngModel [(ngModel)] =\"resetPassword.newPassword\" required/>\n  \t\t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t</div>\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t</div>\n  \t\t\t\t\t<div class=\"row\">\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t\t<div class=\"col-xs-10\" style=\"margin: 0px; padding: 0px;\">\n                <div *ngIf = \"newPassword.errors && (newPassword.dirty || newPassword.touched)\" class=\"formControlError\">\n                  <div [hidden] = \"!newPassword.errors.required\">\n                    This field is required\n                  </div>\n                  <div [hidden] = \"newPassword.errors.require || !newPassword.errors.minlength\">\n                    Enter at least 8 characters.\n                  </div>\n                </div>\n  \t\t\t\t\t\t</div>\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t</div>\n  \t\t\t\t</div>\n          <div class=\"form-group\">\n  \t\t\t\t  <div class=\"row\">\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t\t<div class=\"row col-xs-10 inputContainer\" [class.input-error] = \"confirmError\">\n  \t\t\t\t\t\t\t<div class=\"row\">\n  \t\t\t\t\t\t\t\t<div class=\"col-xs-1 imgContainer\">\n  \t\t\t\t\t\t\t\t\t<img src=\"./assets/img/login_2.png\" style=\"width: 40px;\"/>\n  \t\t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t\t\t<div class=\"col-xs-10\">\n                    <input type=\"password\" name=\"confirmPassword\" [(ngModel)] = 'resetPassword.confirmPassword' placeholder=\"Retype New Passwword\" #confirmPassword='ngModel' minlength = \"8\" ngModel required />\n  \t\t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t\t\t</div>\n  \t\t\t\t\t\t</div>\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t</div>\n  \t\t\t\t    <div class=\"row\">\n  \t\t\t\t\t    <div class=\"col-xs-1\"></div>\n  \t\t\t\t\t    <div class=\"col-xs-10\" style=\"margin: 0px; padding: 0px;\">\n                    <div *ngIf = \"confirmPassword.errors && (confirmPassword.dirty || confirmPassword.touched)\" class=\"formControlError\">\n                      <div [hidden] = \"!confirmPassword.errors.required\">\n                        This field is required\n                      </div>\n                      <div [hidden] = \"confirmPassword.errors.required || !confirmPassword.errors.minlength\">\n                        Enter at least 8 characters.\n                      </div>\n                    </div>\n                    <div *ngIf = \"!confirmPassword.errors && (confirmPassword.dirty || confirmPassword.touched) && (confirmPassword.value !== newPassword.value)\" class=\"formControlError\">\n                      This Password must match with new Password.\n                    </div>\n                </div>\n                <div class=\"col-xs-1\"></div>\n  \t\t\t\t   </div>\n  \t\t\t\t</div>\n  \t\t\t\t<div class=\"form-group\">\n  \t\t\t\t\t<div class=\"row\">\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t\t\t<button type=\"submit\" [disabled] = \"resetPasswordForm.invalid\" class=\"col-xs-10 btn btn-primary\">Reset Password</button>\n  \t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n  \t\t\t\t\t</div>\n  \t\t\t\t</div>\n  \t\t\t</form>\n    </div>\n\t</div>\n</div>\n<!--\n<my-footer></my-footer>\n-->\n"

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

module.exports = "\n\t\t<div class=\"homeImage\">\n\t\t\t<div class=\"row\" style=\"margin-top:0px;\" >\n\t\t\t\t<div class=\"col-sm-12\" style=\"margin-top:40px;\">\n\t\t\t\t\t<form  name=\"searchform\" style=\"width:80%; margin-left:10%; margin-right: 10%;\">\n            <div class=\"row\">\n              <div class=\"col-xs-12\">\n                <input type=\"text\" name=\"cssearch\"  class=\"form-control\" placeholder=\"Search courses by name, instructor and category\" autocomplete=\"off\">\n              </div>\n            </div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<br />\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-sm-9\" style=\"margin-right:0px;\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<p class=\"heading\">\n\t\t\t\t\t\tInformation\n\t\t\t\t\t</p>\n\t\t\t\t\t<p style=\"text-align: center; margin-left: 15%; margin-right: 15%; font-size:16px;\">\n\t\t\t\t\t\t\"According to a 1983 Guinness Book of Records, this monster once\n\t\t\t\t\t\tqualified as literature's longest at 1,288 words, but that record\n\t\t\t\t\t\thas long been surpassed, in English at least, by Jonathan Coe's The\n\t\t\t\t\t\tRotter's Club, which ends with a 33-page-long, 13,955 word sentence.\"\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t\t<br />\n\t\t\t\t<div >\n\t\t\t\t\t<p class=\"heading\">\n\t\t\t\t\t\tPopular Courses\n\t\t\t\t\t</p>\n\t\t\t\t<br />\n\t\t\t\t\t<div class=\"row\" style=\"margin-top:25px;\" >\n\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-3 push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t<img src=\"./assets/img/4.jpg\" /><br />\n\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Deep learning foundation</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-3  push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t<img src=\"./assets/img/5.jpg\" /><br />\n\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t<label>Nanotechnology </label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-3  push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t<img src=\"./assets/img/6.jpg\" /><br />\n\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Machine learning</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br />\n\t\t\t\t\t<div class=\"row\" style=\"margin-top:15px;\" >\n\t\t\t\t\t\t<div class=\"col-sm-1\">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-3  push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t<img src=\"./assets/img/1.jpg\" /><br />\n\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Physics</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-3  push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t<img src=\"./assets/img/2.jpg\" /><br />\n\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t<label>Astronomy</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-3  push-button clickable\" (click)=\"openLiveClass()\">\n\t\t\t\t\t\t\t<img src=\"./assets/img/3.jpg\" /><br />\n\t\t\t\t\t\t\t<div class=\"Cname\">\n\t\t\t\t\t\t\t\t<label>Nano Science</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-sm-3\" style=\"margin-left:0px; padding-left:10px; padding-right:10px;box-shadow: none;\">\n\t\t\t\t<br />\n\t\t\t\t<p class=\"heading\" style=\"margin-top:15px;\">\n\t\t\t\t\tAnnouncements\n\t\t\t\t</p>\n\t\t\t\t<br />\n\t\t\t\t<ul>\n\t\t\t\t\t<li> Course on Android Foundation introduced.</li>\n\t\t\t\t\t<li> Exam registration form is open now for December 2017.</li>\n\t\t\t\t\t<li> Last date for registration is Extended till 26 October 2017 5:00 PM.</li>\n\t\t\t\t\t<li> Result declared for Machine Learning Course</li>\n\t\t\t\t\t<li> New course announced on Artificial Intelligence. Learn skills and tools used by the most\n\t\t\t\t\t\t  innovative AI teams, gain experience solving real-world challenges, and prepare for a wide\n\t\t\t\t\t\t  variety of roles in the AI field</li>\n\t\t\t\t\t<li> Degree course for Signal Processing announced. Registration will open soon.</li>\n\t\t\t\t\t<li> Free course for Digital Logic Design announced. Registrations are open.</li>\n\t\t\t\t\t<li> \tLearn to clean up messy data, uncover patterns and insights, make predictions using\n\t\t\t\t\t\t   machine learning, and clearly communicate your findings in Data Analyst Course.</li>\n\t\t\t\t\t<li> Learn how you can use HTML5 Canvas to create and modify images or even interactive animations.</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t\t<br />\n\t\t<div style=\"margin-top:40px; background-color:#e5e5e5\" >\n\t\t\t<div>\n\t\t\t\t<p class=\"heading\" style=\"\tpadding:11px 0px; margin-bottom:30px;border-bottom: 1px solid #efefef; margin-right:15%; margin-left:15%;\">\n\t\t\t\t\tContact Us\n\t\t\t\t</p>\n\t\t\t\t<p style=\"text-align: center; margin-left: 30%; margin-right: 30%; margin-top:40px;\n\t\t\t\t\t\t\tmargin-bottom:63px;font-size:16px;\">\n\t\t\t\t\tGet to know us, our courses and our platform. You can reach us Monday-Friday,\n\t\t\t\t\t10am-5pm (CET) by telephone at +49 30 28095772 or submit the contact form.\n\t\t\t\t\tWe will get back to you as soon as possible.\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t<form style=\"margin-bottom:30px;\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"text\" maxlength=\"40\" name=\"First Name\" class=\"form-control\" placeholder=\"First name *\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"text\" maxlength=\"40\" name=\"Last Name\" class=\"form-control\" placeholder=\"Last name *\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"text\" maxlength=\"40\" name=\"Email\" class=\"form-control\" placeholder=\"Email *\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"text\" maxlength=\"40\" name=\"College\" class=\"form-control\" placeholder=\"College*\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"text\" maxlength=\"40\" name=\"Phone\" class=\"form-control\" placeholder=\"Phone*\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<div class=\"form-underlined\">\n\t\t\t\t\t\t\t <select name=\"LEADCF11\" class=\"form-control\">\n\t\t\t\t\t\t\t\t  <option value=\"-None-\"> - Select a Topic - </option>\n\t\t\t\t\t\t\t\t  <option value=\"Course Enrolments\">Course Enrolments</option>\n\t\t\t\t\t\t\t\t  <option value=\"Custom Course Development\">Custom Course Development</option>\n\t\t\t\t\t\t\t\t  <option value=\"Private Academy\">Private Academy</option>\n\t\t\t\t\t\t\t\t  <option value=\"Distribution Partnerships\">Distribution Partnerships</option>\n\t\t\t\t\t\t\t </select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\" style=\"padding-bottom:15px;\">\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t<textarea maxlength=\"1000\" name=\"Description\" class=\"form-control\" placeholder=\"How may we assist you\"></textarea>\n\t\t\t\t\t\t<div class=\"wrapper\">\n\t\t\t\t\t\t\t<div class=\"button push-button button-pri-2 clickable\" style=\"width: 18%; margin-left: 41%; margin-right: 41%;\">Send</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n"

/***/ }),

/***/ 244:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-3\">\r\n      <div style=\"border: none; background: white; padding: 20px; box-shadow: gray 2px 2px 15px 1px;\">\r\n        <img src=\"./assets/profile.jpg\" style=\"width: 80%; margin-left: 10%; margin-right: 10%; border-radius: 50%;\"/>\r\n        <div style=\"padding: 5px; font-size: 1.2em; text-align: center; font-weight: 600; margin: 10px;\">\r\n          {{user.firstname}}   {{user.lastname}}\r\n        </div>\r\n        <div style=\"margin-top: 5px;\">\r\n          Email: {{user.email}}\r\n        </div>\r\n        <div>\r\n          College: {{instructor.clg}}\r\n        </div>\r\n        <div>\r\n          Degree: {{instructor.qualifications}}\r\n        </div>\r\n        <div>\r\n          Experience: {{instructor.experience}}\r\n        </div>\r\n      </div>\r\n      <div style=\"border: none; background: white; padding: 20px; box-shadow: gray 2px 2px 15px 1px; margin-top: 15px;\">\r\n        <div class=\"row\">\r\n          <div class=\"col-xs-6\">\r\n            Click to Start Live Streaming\r\n          </div>\r\n          <div class=\"col-xs-5\">\r\n            <div class=\"g-hangout\" data-render=\"createhangout\" data-hangout_type = \"onair\"></div>\r\n          </div>\r\n        </div>\r\n        <div style=\"margin: 50px;\">\r\n          <div style=\"margin-bottom: 10px;\">\r\n              Please Provide Link for Hangout\r\n          </div>\r\n\r\n          <input type=\"text\" style=\"width: 80%;\" style=\"margin-bottom: 10px; padding: 10px;\" placeholder=\"Hangout Link from Embed Code\" ngModel name=\"code\" #code=\"ngModel\" [(ngModel)]=\"embedcode\" />\r\n          <div class=\"button button-pri push-button clickable\" style=\"width: 185px;\" (click)=\"onLinkSubmit()\" *ngIf=\"!online\">\r\n            Start Broadcasting\r\n          </div>\r\n          <div class=\"button button-dan push-button clickable\" style=\"width: 200px;\" (click)=\"onStopClick()\" *ngIf=\"online\">\r\n            Stop Broadcasting\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-9\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-8\">\r\n          <iframe width=\"100%\" height=\"650px\" src=\"https://awwapp.com/b/uor0z1rrn/\" #awwboard id=\"awwboard\" style=\"border: none; box-shadow: gray 1px 1px 15px 1px;\"></iframe>\r\n        </div>\r\n        <div class=\"col-xs-4\">\r\n          <div *ngIf=\"online\">\r\n            <iframe width=\"100%\" height=\"200\" [src]=\"sanitizer.bypassSecurityTrustResourceUrl(embedcode)\" frameborder=\"0\" allowfullscreen></iframe>\r\n          </div>\r\n          <div style=\"margin-top: 10px; width: 100%; height: 255px; background: white; box-shadow: gray 1px 1px 15px 1px;\">\r\n            <textarea class=\"chatbox\" readonly>{{chat}}</textarea>\r\n            <div class=\"row\">\r\n              <div class=\"col-xs-8\">\r\n                <input type=\"text\" name=\"message\" [(ngModel)]=\"message\" ngModel placeholder=\"Write a Message Here\" style=\"padding: 8px; margin: 5px; width: 100%;\"/>\r\n              </div>\r\n              <div class=\"col-xs-4\">\r\n                <div class=\"button button-pri push-button clickable\" style=\"font-size: 1.2em;\" (click)=\"sendMessage()\">\r\n                  Send <span class=\"glyphicon glyphicon-send\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </div>\r\n        <div style=\"margin-top: 10px; width: 100%; height: 300px; background: white; box-shadow: gray 1px 1px 15px 1px;\">\r\n          <h4 style=\"text-align: center; padding: 10px; background: lightgray;\">Online Students</h4>\r\n          <div style=\"width: 100%; height: 250px; overflow-y: scroll; padding: 10px;\">\r\n              <li *ngFor=\"let activeUser of onlineUsers\" style=\"background: #EEEEEE; padding: 5px;list-style-type: none; margin-bottom: 5px;\">\r\n                {{activeUser.name}} ({{activeUser.username}})\r\n              </li>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 245:
/***/ (function(module, exports) {

module.exports = "<div style=\"padding: 15px\">\r\n  <h3>{{course_name}}</h3>\r\n  <div class=\"button button-pri-2 push-button clickable\" style=\"width: 200px; margin-top: 15px;\">\r\n    Back To Course\r\n  </div>\r\n  <div class=\"fluid-container\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-7\" style=\"padding: 15px;\">\r\n          <iframe width=\"100%\" height=\"650px\" src=\"https://awwapp.com/b/uor0z1rrn/\" #awwboard id=\"awwboard\" style=\"border: none; box-shadow: gray 1px 1px 15px 1px;\"></iframe>\r\n        </div>\r\n        <div class=\"col-xs-5\" style=\"padding: 15px;\">\r\n          <!---->\r\n          <iframe width=\"100%\" height=\"350\" [src]=\"sanitizer.bypassSecurityTrustResourceUrl(stream.embedcode)\" frameborder=\"0\" allowfullscreen></iframe>\r\n          <div style=\"margin-top: 10px; width: 100%; height: 280px; background: white; box-shadow: gray 1px 1px 15px 1px;\">\r\n            <textarea class=\"chatbox\" readonly>{{chat}}</textarea>\r\n            <div class=\"row\">\r\n              <div class=\"col-xs-8\">\r\n                <form>\r\n                    <input type=\"text\" name=\"message\" ngModel [(ngModel)]=\"message\" placeholder=\"Write a Message Here\" style=\"padding: 8px; margin: 5px; width: 100%;\"/>\r\n                </form>\r\n              </div>\r\n              <div class=\"col-xs-4\">\r\n                <div class=\"button button-pri push-button clickable\" style=\"font-size: 1.2em;\" (click)=\"sendMessage()\">\r\n                  Send <span class=\"glyphicon glyphicon-send\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 246:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\t<div class=\"row mainContainer\">\n\t\t<div class=\"col-md-6\">\n\t\t\t<img src=\"./assets/img/logo.jpg\" />\n\t\t</div>\n\n\t\t<div class=\"col-md-6\">\n\t\t\t<form #loginForm = \"ngForm\" (ngSubmit) = \"onLoginSubmit(loginForm)\" novalidate>\n\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t<div class=\"row col-xs-10 inputContainer\">\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-xs-1 imgContainer\">\n\t\t\t\t\t\t\t\t\t<img src=\"./assets/img/login_user.png\" style=\"width: 40px;\" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xs-10\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Username\" ngModel name=\"username\" #username = 'ngModel' [(ngModel)] = 'loginCredentials.username' required />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t<div class=\"col-xs-10\" style=\"margin: 0px; padding: 0px;\">\n\t\t\t\t\t\t\t<div *ngIf = \"username.errors && (username.dirty || username.touched)\" class=\"formControlError\">\n\t\t\t\t\t\t\t\t<div [hidden] = \"!username.errors.required\">\n\t\t\t\t\t\t\t\t\tThis field is required\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t<div class=\"row col-xs-10 inputContainer\">\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-xs-1 imgContainer\">\n\t\t\t\t\t\t\t\t\t<img src=\"./assets/img/login_2.png\" style=\"width: 40px;\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xs-10\">\n\t\t\t\t\t\t\t\t\t<input ngModel #password = 'ngModel' type=\"password\" placeholder=\"Password\" name=\"password\" minlength = \"8\" [(ngModel)] = 'loginCredentials.password' required />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t<div class=\"col-xs-10\" style=\"margin: 0px; padding: 0px;\">\n\t\t\t\t\t\t\t<div *ngIf = \"password.errors && (password.dirty || password.touched)\" class=\"formControlError\">\n\t\t\t\t\t\t\t\t<div [hidden] = \"!password.errors.required\">\n\t\t\t\t\t\t\t\t\tThis field is required\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div [hidden] = \"password.errors.required || !password.errors.minlength\">\n\t\t\t\t\t\t\t\t\tEnter at least 8 characters.\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t\t\t<button type=\"submit\" [disabled] = \"loginForm.invalid\" class=\"col-xs-10 btn btn-primary\">Login</button>\n\t\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t</form>\n\n\t\t\t<div class=\"row\" style=\"padding: 0px 10px;\">\n\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t\t\t<div class=\"col-xs-10\" style=\"padding: 0px 0px; margin-bottom: 0px;\">\n\t\t\t\t\t\t<a (click)=\"onForgetPassClick()\" style=\"cursor: pointer;\">Forgot Password?</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-xs-1\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<!--\n<my-footer></my-footer>\n-->\n"

/***/ }),

/***/ 247:
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar\">\n  <div class=\"col-xs-2 vc\" style=\"font-size: 1.4em; letter-spacing: 3px;\">\n    NPTEL\n  </div>\n  <div class=\"col-xs-2\">\n    <div class=\"vc clickable nav-item\" *ngIf=\"isAdmin\" (click)=\"onDashboardClick()\">\n      <span class=\"glyphicon glyphicon-dashboard icon\"></span>Dashboard\n    </div>\n  </div>\n  <div class=\"col-xs-8\">\n    <div class=\"col-xs-2 vc clickable nav-item\" (click)=\"homeClick()\">\n      <span class=\"glyphicon glyphicon-home icon\"></span>Home\n    </div>\n    <div class=\"col-xs-2 vc clickable nav-item\" (click)=\"openCourse()\">\n      <span class=\"glyphicon glyphicon-list icon\"></span>Courses\n    </div>\n    <div class=\"col-xs-2 vc clickable nav-item\">\n      <span class=\"glyphicon glyphicon-briefcase icon\"></span>Resources\n    </div>\n    <div class=\"col-xs-2 vc clickable nav-item\">\n      <span class=\"glyphicon glyphicon-question-sign icon\"></span>FAQ\n    </div>\n    <div class=\"col-xs-2\">\n      <div class=\"button button-pri push-button clickable\" (click)=\"clickButton('login')\" *ngIf=\"!loggedIn\">\n        <span class=\"glyphicon glyphicon-log-in icon\"></span>Log In\n      </div>\n      <div class=\"vc\" style=\"text-align: right; margin-right:5px;\">\n        {{name}}\n      </div>\n    </div>\n    <div class=\"col-xs-2\">\n      <div class=\"button button-pri-2 push-button clickable\" (click)=\"clickButton('signup')\" *ngIf=\"!loggedIn\">\n        <span class=\"glyphicon glyphicon-plus-sign icon\"></span>Sign Up\n      </div>\n      <div class=\"button button-dan push-button clickable\" (click)=\"onLogoutClick()\" *ngIf=\"loggedIn\">\n        Logout<span class=\"glyphicon glyphicon-log-out icon\" style=\"margin-left:8px;\"></span>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align: center; margin: 150px 0px 20px 0px;\">404</h2>\n<h3 style=\"text-align: center; padding: 0px;\">Page Not Found</h3>\n"

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"mainContainer\">\n    <div class=\"heading-container\">\n      Create A Free Account\n    </div>\n    <hr>\n    <div class=\"body-container\">\n      <form #signupForm='ngForm' (ngSubmit) = \"onFormSubmit(signupForm)\" novalidate>\n        <div class=\"row\">\n          <div class=\"col-xs-1\"></div>\n          <div class=\"col-xs-5\">\n            <input type=\"text\" placeholder=\"Firstname\" required name=\"fname\" ngModel #fname=\"ngModel\" [(ngModel)]='newUser.fname'/>\n          </div>\n          <div class=\"col-xs-5\">\n            <input type=\"text\" placeholder=\"Lastname\" required name=\"lname\" ngModel #lname=\"ngModel\" [(ngModel)]=\"newUser.lname\"/>\n          </div>\n          <div class=\"col-xs-1\"></div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-1\"></div>\n          <div class=\"col-xs-10\">\n            <input type=\"text\" placeholder=\"Username\" required name=\"username\" ngModel #username=\"ngModel\" [(ngModel)]=\"newUser.username\"/>\n          </div>\n          <div class=\"col-xs-1\"></div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-1\"></div>\n          <div class=\"col-xs-10\">\n            <input type=\"password\" placeholder=\"Your Password\" required name=\"password\" ngModel #password=\"ngModel\" [(ngModel)]=\"newUser.password\"/>\n          </div>\n          <div class=\"col-xs-1\"></div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-1\"></div>\n          <div class=\"col-xs-5\">\n            <input type=\"text\" placeholder=\"Email Address\" required name=\"email\" ngModel #email=\"ngModel\" [(ngModel)]=\"newUser.email\"/>\n          </div>\n          <div class=\"col-xs-5\">\n            <input type=\"text\" placeholder=\"Mobile No\" required name=\"mobile\" ngModel #mobile=\"ngModel\" [(ngModel)]=\"newUser.mobile\"/>\n          </div>\n          <div class=\"col-xs-1\"></div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-1\"></div>\n          <div class=\"col-xs-5\">\n            <input type=\"submit\" value=\"Register\" class=\"button button-pri push-button clickable\" style=\"border: none;\"/>\n          </div>\n          <div class=\"col-xs-5\">\n            <div value=\"Cancel\" class=\"button button-dan push-button clickable\" style=\"margin: 0 10px; padding: 5px 8px; line-height: 2.0em; width: 100%;\" (click)='onCancelClick(signupForm)'>\n              Cancel\n            </div>\n          </div>\n          <div class=\"col-xs-1\"></div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var Config = (function () {
    function Config() {
    }
    return Config;
}());

Config.BACKEND_SERVER = "http://44febe68.ngrok.io/api/";
Config.COPYRIGHT = "Copyright @ 2017 Mobio Solutions. All Rights Reserved.";
Config.SOCKET_SERVER_URL = "http://44febe68.ngrok.io";
Config.COMPANY_NAME_SHORT = 'MS';
Config.CHART_COLORS = [
    '#8F44AD',
    '#2A80B9',
    '#16A086',
    '#27AE61',
    '#F39C11',
    '#D25400',
    '#C1392B',
    '#BEC3C7',
    '#7E8C8D',
    '#2D3E50'
];
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "home.a551cb346b800b5e0ccd.jpg";

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(133);


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LstreamService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Service to handle forgot password RequestOptions
//This service mainly works with http requests








var LstreamService = (function () {
    function LstreamService(http, router, userService, flashMessage) {
        this.http = http;
        this.router = router;
        this.userService = userService;
        this.flashMessage = flashMessage;
        //REST api server address
        this.server = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* Config */].BACKEND_SERVER;
    }
    //Function to send email using the backend rest api
    LstreamService.prototype.createLStream = function (stream) {
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        return this.http.post(this.server + 'lstream/add', JSON.stringify(stream), { headers: headers }).map(function (res) { return res.json(); });
    };
    LstreamService.prototype.getLStream = function (username) {
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        return this.http.get(this.server + 'lstream/getByInstructor', { headers: headers }).map(function (res) { return res.json(); });
    };
    LstreamService.prototype.getStreamByCourseno = function (courseno) {
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        params.set('courseno', courseno);
        return this.http.get(this.server + 'lstream/livestream', { headers: headers, search: params }).map(function (res) { return res.json(); });
    };
    LstreamService.prototype.getAllStreams = function () {
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        return this.http.get(this.server + 'lstream/all', { headers: headers }).map(function (res) { return res.json(); });
    };
    LstreamService.prototype.deleteLStream = function (username) {
        var reqBody = {
            username: username
        };
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        return this.http.delete(this.server + 'lstream/delete', { headers: headers, body: JSON.stringify(reqBody) }).map(function (res) { return res.json(); });
    };
    //Function to verify the link clicked by user in the email
    LstreamService.prototype.verifyEmailLink = function (hash) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.server + 'forgetpass/sendEmail', JSON.stringify(hash), { headers: headers }).map(function (res) { return res.json(); });
    };
    //If link is verified then use this function to reset the password
    LstreamService.prototype.resetPassword = function (resetObject) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.server + 'forgetpass/resetPassword', JSON.stringify(resetObject), { headers: headers }).map(function (res) { return res.json(); });
    };
    return LstreamService;
}());
LstreamService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _d || Object])
], LstreamService);

var _a, _b, _c, _d;
//# sourceMappingURL=lstream.service.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng_socket_io__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(25);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnlineService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//this service provides function to maintain online user stat and get data of online users





var OnlineService = (function () {
    function OnlineService(socket, userService, http) {
        this.socket = socket;
        this.userService = userService;
        this.http = http;
        this.server = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* Config */].BACKEND_SERVER;
    }
    //send connect 'hi' message to the socket server
    OnlineService.prototype.sendConnectMessage = function () {
        this.userService.validateToken();
        var user = this.userService.loadUserData();
        var data = { username: user.username, name: user.firstname + " " + user.lastname };
        this.socket.emit('hi', JSON.stringify(data));
    };
    //return the socket to be accessed in other services and components
    OnlineService.prototype.getSocket = function () {
        return this.socket;
    };
    OnlineService.prototype.sendMessage = function (message) {
        this.userService.validateToken();
        var user = this.userService.loadUserData();
        var data = { username: user.username, msg: message };
        this.socket.emit('send', JSON.stringify(data));
    };
    return OnlineService;
}());
OnlineService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng_socket_io__["Socket"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng_socket_io__["Socket"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"]) === "function" && _c || Object])
], OnlineService);

var _a, _b, _c;
//# sourceMappingURL=online.service.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_my_animations__ = __webpack_require__(142);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminComponent = (function () {
    function AdminComponent(userService, flashMessage, router, route) {
        this.userService = userService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.route = route;
        this.state = 'active';
        this.users = [];
        this.newUser = {
            fName: '',
            lName: '',
            username: '',
            type: 'instructor',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: ''
        };
        //show form when true, user list otherwise
        this.showAddForm = false;
        //filter for user filter
        this.filter = {
            name: '',
            type: '',
            email: '',
            status: ''
        };
        //data for pagination
        this.limits = [10, 20, 50];
        this.listLimit = +this.limits[0];
        this.page = 1;
    }
    //executes when component is created
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        //retrieve all users informations
        this.userService.getAllInstructors().subscribe(function (data) {
            if (data.success) {
                _this.users = data.ins;
            }
            else
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
        });
        //if route matches to add or edit and route has showAddForm data then show form instead of users list
        this.route.data.subscribe(function (data) {
            if (data.showAddForm)
                _this.showAddForm = true;
            else
                _this.showAddForm = false;
        });
    };
    //when add user button is clicked
    AdminComponent.prototype.onAddUserClick = function () {
        this.router.navigate(['/admin/user/add']);
    };
    //helper function to reset forms
    AdminComponent.prototype.resetForm = function (form) {
        var elements = document.getElementsByTagName('input');
        for (var i = 0; i < elements.length; i++)
            elements.item(i).blur();
        form.reset();
        this.newUser.fName = "";
        this.newUser.lName = "";
        this.newUser.username = "";
        this.newUser.email = "";
        this.newUser.mobile = "";
        this.newUser.password = '';
        this.newUser.confirmPassword = "";
    };
    //when clicked on cancel navigate to user list path
    AdminComponent.prototype.onCancelClick = function (form) {
        this.resetForm(form);
        this.router.navigate(['/admin/user']);
    };
    //when add user form is submitted
    AdminComponent.prototype.onSubmit = function (form) {
        var _this = this;
        //create new user object from the input fields
        var addUser = {
            fname: this.newUser.fName,
            lname: this.newUser.lName,
            username: this.newUser.username,
            email: this.newUser.email,
            mobile: this.newUser.mobile,
            type: this.newUser.type,
            password: this.newUser.password
        };
        //use user service to add new user
        this.userService.addUser(addUser).subscribe(function (data) {
            if (data.success) {
                //on success add new user to the users array for client side update
                _this.users.push(addUser);
                //show success message
                if (data.msg) {
                    _this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1500 });
                }
                else {
                    _this.flashMessage.show("New Instructor added to the system", { cssClass: 'alert-success', timeout: 1500 });
                }
                //reset form
                _this.resetForm(form);
            }
            else {
                if (data.msg) {
                    _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
                }
                else {
                    _this.flashMessage.show("Instructor can't be added to the system", { cssClass: 'alert-danger', timeout: 1500 });
                }
                //reset form
                _this.resetForm(form);
            }
        });
    };
    //when user clicks on trash icon
    AdminComponent.prototype.onDeleteClick = function (user) {
        var _this = this;
        //use userservice to delete that perticular user
        this.userService.deleteUser(user.username).subscribe(function (res) {
            if (res.success) {
                //if success in deletion the update array for client side updation
                var newUsers = [];
                var len = _this.users.length;
                for (var i = 0; i < len; i++) {
                    if (_this.users[i].username.toLowerCase() !== user.username.toLowerCase())
                        newUsers.push(_this.users[i]);
                }
                _this.users = newUsers;
                if (_this.users.length <= _this.listLimit * (_this.page - 1))
                    _this.page = _this.page - 1;
                _this.flashMessage.show("User deleted successfully", { cssClass: 'alert-success', timeout: 1500 });
            }
            else {
                //if error show error
                if (res.msg) {
                    _this.flashMessage.show(res.msg, { cssClass: 'alert-danger', timeout: 1500 });
                }
                else {
                    _this.flashMessage.show("Error in deleting the user.", { cssClass: 'alert-danger', timeout: 1500 });
                }
            }
        });
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__(240),
        styles: [__webpack_require__(220)],
        animations: [
            __WEBPACK_IMPORTED_MODULE_4__animation_my_animations__["a" /* FocusAnimation */],
            __WEBPACK_IMPORTED_MODULE_4__animation_my_animations__["b" /* MoveAnimation */],
            __WEBPACK_IMPORTED_MODULE_4__animation_my_animations__["c" /* MoveUpAnimation */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], AdminComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CourseComponent = (function () {
    function CourseComponent(router) {
        this.router = router;
    }
    CourseComponent.prototype.ngOnInit = function () {
    };
    CourseComponent.prototype.openLiveClass = function () {
        this.router.navigate(['/class']);
    };
    return CourseComponent;
}());
CourseComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-course',
        template: __webpack_require__(241),
        styles: [__webpack_require__(221)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], CourseComponent);

var _a;
//# sourceMappingURL=course.component.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_password_reset_service__ = __webpack_require__(93);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//this component is displayed when clicked on forgot password link




var ForgetPasswordComponent = (function () {
    function ForgetPasswordComponent(router, flashMessage, resetService, route) {
        this.router = router;
        this.flashMessage = flashMessage;
        this.resetService = resetService;
        this.route = route;
        //data bound with send mail form
        this.state = 'active';
        this.user = {
            email: ""
        };
        //when true show send link form otherwise display reset password form
        this.send = true;
        //data bound with reset password form
        this.resetPassword = {
            newPassword: "",
            confirmPassword: ""
        };
        //to store hash sent with link in email
        this.hash = '';
    }
    ForgetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        //access data field sent with the route
        this.route.data.subscribe(function (data) {
            if (data.send !== undefined)
                _this.send = data.send;
            //if path contains check parameter then save it to hash variable
            _this.route.queryParams.subscribe(function (params) {
                if (params['check'])
                    _this.hash = params['check'];
                else if (!_this.send)
                    _this.flashMessage.show('You can\'t use this link to reset password.', { cssClass: 'alert-danger', timeout: 1500 });
            });
        });
    };
    //navigate to login page
    ForgetPasswordComponent.prototype.onBackClick = function () {
        this.router.navigate(['/login']);
    };
    //on send email form submitted
    ForgetPasswordComponent.prototype.onFormSubmit = function (form) {
        var _this = this;
        //use reset password service to send resetPassword link
        this.resetService.sendResetEmail(this.user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show("A Password Reset linke is sent to your email address.", { cssClass: 'alert-success', timeout: 1500 });
                _this.user.email = "";
                var elements = document.getElementsByTagName('input');
                for (var i = 0; i < elements.length; i++)
                    elements.item(i).blur();
                form.reset();
            }
            else {
                //if error, show error
                if (data.msg)
                    _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
                else
                    _this.flashMessage.show("Error in sending email with password reset link.");
                var elements = document.getElementsByTagName('input');
                for (var i = 0; i < elements.length; i++)
                    elements.item(i).blur();
                form.reset();
            }
        });
    };
    //function executes when user click reset password button
    ForgetPasswordComponent.prototype.onResetFormSubmit = function (form) {
        var _this = this;
        var object = {
            hash: this.hash,
            password: this.resetPassword.newPassword
        };
        //use hash provided in the route link to verify and reset password
        this.resetService.resetPassword(object).subscribe(function (response) {
            if (response.success) {
                _this.flashMessage.show("You password is reset.", { cssClass: 'alert-success', timeout: 1500 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show("Error in resetting your password.", { cssClass: 'alert-danger', timeout: 1500 });
            }
        });
    };
    return ForgetPasswordComponent;
}());
ForgetPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-forget-password',
        template: __webpack_require__(242),
        styles: [__webpack_require__(222)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_password_reset_service__["a" /* PasswordResetService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_password_reset_service__["a" /* PasswordResetService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], ForgetPasswordComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=forget-password.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(router) {
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.openLiveClass = function () {
        this.router.navigate(['/class']);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(243),
        styles: [__webpack_require__(223)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_lstream_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_instructor_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_online_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstructorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var InstructorComponent = (function () {
    function InstructorComponent(lStream, userService, flashMessage, sanitizer, instructorService, OnlineService, router, cdr) {
        this.lStream = lStream;
        this.userService = userService;
        this.flashMessage = flashMessage;
        this.sanitizer = sanitizer;
        this.instructorService = instructorService;
        this.OnlineService = OnlineService;
        this.router = router;
        this.cdr = cdr;
        this.embedcode = "";
        this.online = false;
        this.videoSrc = "";
        this.user = {};
        this.instructor = {};
        this.message = "";
        this.chat = "Bot\nHello\n------------------------\n";
        this.onlineUsers = [];
    }
    InstructorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.validateToken();
        this.user = this.userService.loadUserData();
        this.lStream.getLStream(this.userService.loadUserData().username).subscribe(function (data) {
            if (data.success) {
                _this.online = true;
                var urls = data.stream.embedcode.split("/");
                _this.embedcode = "https://www.youtube.com/embed/" + urls[urls.length - 1];
                console.log(_this.embedcode);
                _this.flashMessage.show("You are online now.", { cssClass: 'alert-success', timeout: 1500 });
            }
        });
        this.instructorService.getInstructorProfile(this.user.username).subscribe(function (data) {
            if (data.success) {
                _this.instructor = data.ins;
            }
            else {
                _this.flashMessage.show("Error in retrieving instructor's profile", { cssClass: "alert-danger", timeout: 1500 });
            }
        });
        this.OnlineService.getSocket().disconnect();
        this.OnlineService.getSocket().connect();
        this.OnlineService.sendConnectMessage();
        this.OnlineService.getSocket().fromEvent("receive").map(function (data) { return data.data; }).subscribe(function (data) {
            var message = JSON.parse(data);
            if (message.username === _this.user.username)
                message.username = "You";
            var msg = message.username + "\n" + message.msg + "\n------------------------\n";
            _this.chat = _this.chat + msg;
        });
        this.OnlineService.getSocket().fromEvent("broadcast").map(function (data) { return data.user; }).subscribe(function (data) {
            data = JSON.parse(data);
            var newArray = [];
            var j = 0;
            var d;
            var updated = false;
            for (var i = 0; i < _this.onlineUsers.length; i++) {
                d = _this.onlineUsers[i];
                if (data.username === d.username)
                    updated = true;
                if (data.username !== d.username)
                    newArray.push(d);
            }
            if (!updated)
                newArray.push(data);
            _this.onlineUsers = newArray;
        });
        this.OnlineService.getSocket().fromEvent("remove").map(function (data) { return data.user; }).subscribe(function (data) {
            data = JSON.parse(data);
            var newArray = [];
            for (var i = 0; i < _this.onlineUsers.length; i++) {
                if (_this.onlineUsers[i].id !== data.id)
                    newArray.push(_this.onlineUsers[i]);
            }
            _this.onlineUsers = newArray;
        });
    };
    InstructorComponent.prototype.onLinkSubmit = function () {
        var _this = this;
        this.userService.validateToken();
        var user = this.userService.loadUserData();
        var stream = {
            username: user.username,
            code: this.embedcode,
            courseno: "cs001"
        };
        this.lStream.createLStream(stream).subscribe(function (data) {
            if (data.success) {
                _this.online = true;
                _this.flashMessage.show("You are online now.", { cssClass: 'alert-success', timeout: 1500 });
                _this.router.navigate(['/instructor']);
            }
            else {
                console.log(data.msg);
                _this.flashMessage.show("Error in starting live stream. Close the Hangout App now.", { cssClass: 'alert-danger', timeout: 1500 });
            }
        });
    };
    InstructorComponent.prototype.onStopClick = function () {
        var _this = this;
        this.userService.validateToken();
        this.online = false;
        this.videoSrc = "";
        this.lStream.deleteLStream(this.userService.loadUserData().username).subscribe(function (data) {
            if (data.success)
                _this.flashMessage.show("You are ofline now.", { cssClass: 'alert-success', timeout: 1500 });
            else
                _this.flashMessage.show("Error in stoping live stream. Close the Hangout App now.", { cssClass: 'alert-danger', timeout: 1500 });
        });
    };
    InstructorComponent.prototype.ngOnDestroy = function () {
        this.OnlineService.getSocket().disconnect();
    };
    InstructorComponent.prototype.sendMessage = function () {
        this.OnlineService.sendMessage(this.message);
        this.message = "";
    };
    return InstructorComponent;
}());
InstructorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-instructor',
        template: __webpack_require__(244),
        styles: [__webpack_require__(224)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_lstream_service__["a" /* LstreamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_lstream_service__["a" /* LstreamService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_instructor_service__["a" /* InstructorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_instructor_service__["a" /* InstructorService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services_online_service__["a" /* OnlineService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_online_service__["a" /* OnlineService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _h || Object])
], InstructorComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=instructor.component.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_lstream_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_online_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LiveclassComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LiveclassComponent = (function () {
    function LiveclassComponent(lstream, sanitizer, OnlineService, userService, router) {
        this.lstream = lstream;
        this.sanitizer = sanitizer;
        this.OnlineService = OnlineService;
        this.userService = userService;
        this.router = router;
        this.course_name = "Human Computer Interaction";
        this.stream = {};
        this.message = "";
        this.chat = "Bot\nHello\n------------------------\n";
        this.user = {};
    }
    LiveclassComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.validateToken();
        this.user = this.userService.loadUserData();
        this.lstream.getStreamByCourseno("cs001").subscribe(function (data) {
            if (data.success) {
                _this.stream = data.stream;
                var link = _this.stream.embedcode.split("/");
                _this.stream.embedcode = "https://youtube.com/embed/" + link[link.length - 1];
            }
        });
        this.OnlineService.getSocket().disconnect();
        this.OnlineService.getSocket().connect();
        this.OnlineService.sendConnectMessage();
        this.OnlineService.getSocket().fromEvent("receive").map(function (data) { return data.data; }).subscribe(function (data) {
            var message = JSON.parse(data);
            if (message.username === _this.user.username)
                message.username = "You";
            var msg = message.username + "\n" + message.msg + "\n------------------------\n";
            _this.chat = _this.chat + msg;
        });
    };
    LiveclassComponent.prototype.ngOnDestroy = function () {
        this.OnlineService.getSocket().disconnect();
    };
    LiveclassComponent.prototype.sendMessage = function () {
        this.OnlineService.sendMessage(this.message);
        this.message = "";
    };
    return LiveclassComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('awwboard'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], LiveclassComponent.prototype, "board", void 0);
LiveclassComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-liveclass',
        template: __webpack_require__(245),
        styles: [__webpack_require__(225)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_lstream_service__["a" /* LstreamService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_lstream_service__["a" /* LstreamService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_online_service__["a" /* OnlineService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_online_service__["a" /* OnlineService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */]) === "function" && _f || Object])
], LiveclassComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=liveclass.component.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(flashMessage, userService, router, route) {
        this.flashMessage = flashMessage;
        this.userService = userService;
        this.router = router;
        this.route = route;
        //Data bound with html template
        this.state = 'active';
        this.loggedIn = false;
        this.loginCredentials = {
            username: "",
            password: ""
        };
    }
    //function executes when user clicks login button
    LoginComponent.prototype.onLoginSubmit = function (loginForm) {
        var _this = this;
        //use userservice to authenticate user
        this.userService.authenticate(this.loginCredentials).subscribe(function (data) {
            //if success field of returned data is true then user is authenticate
            if (data.success) {
                //use returned user data and token to local storage
                _this.userService.saveUserData(data.user, data.token);
                _this.flashMessage.show('You are logged in.', { cssClass: 'alert-success alert-dismissible', timeout: 1500 });
                _this.loggedIn = true;
                if (data.user.type === 'admin')
                    _this.router.navigate(['/admin/user']);
                else
                    //after authenticate navigate to dashboard of the user
                    _this.router.navigate(['/home']);
            }
            else {
                //show error message
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger alert-dismissible', timeout: 1500 });
                //remove focus from all form controls and reset form to prestine state
                var elements = document.getElementsByTagName('input');
                for (var i = 0; i < elements.length; i++)
                    elements.item(i).blur();
                loginForm.reset();
            }
        });
    };
    //when user click on forgot password link navigate to forgot password page
    LoginComponent.prototype.onForgetPassClick = function () {
        this.router.navigate(['/forgotpassword/send']);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(246),
        styles: [__webpack_require__(226)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_flash_messages__["FlashMessagesService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(userService, flashMessage, router) {
        this.userService = userService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.name = '';
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.logIn = function () {
        this.loggedIn = true;
        var user = this.userService.loadUserData();
        this.name = user.firstname + " " + user.lastname;
        if (user.type === 'admin' || user.type === 'instructor')
            this.isAdmin = true;
        else
            this.isAdmin = false;
    };
    NavbarComponent.prototype.clickButton = function (name) {
        if (name === 'login')
            this.router.navigate(['/login']);
        else if (name === 'signup')
            this.router.navigate(['/signup']);
    };
    NavbarComponent.prototype.onDashboardClick = function () {
        var type = this.userService.loadUserData().type;
        if (type === 'admin')
            this.router.navigate(['/admin/user']);
        else
            this.router.navigate(['/instructor']);
    };
    NavbarComponent.prototype.openCourse = function () {
        this.router.navigate(['/course']);
    };
    NavbarComponent.prototype.homeClick = function () {
        this.router.navigate(['/home']);
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        var _this = this;
        this.userService.logout().subscribe(function (response) {
            if (response.success) {
                _this.userService.clearStorage();
                _this.loggedIn = false;
                _this.isAdmin = false;
                _this.name = '';
                _this.flashMessage.show(response.msg, { cssClass: 'alert-success', timeout: 1500 });
                _this.router.navigate(['/home']);
            }
        });
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__(247),
        styles: [__webpack_require__(227)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object])
], NavbarComponent);

var _a, _b, _c;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-page-not-found',
        template: __webpack_require__(248),
        styles: [__webpack_require__(228)]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupComponent = (function () {
    function SignupComponent(userService, flashMessage, router) {
        this.userService = userService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.newUser = {
            fname: '',
            lname: '',
            username: '',
            email: '',
            mobile: '',
            password: '',
            type: 'learner'
        };
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.resetForm = function (form) {
        var elements = document.getElementsByTagName('input');
        for (var i = 0; i < elements.length; i++)
            elements.item(i).blur();
        form.reset();
        this.newUser.fname = "";
        this.newUser.lname = "";
        this.newUser.username = "";
        this.newUser.email = "";
        this.newUser.mobile = '';
        this.newUser.password = "";
    };
    SignupComponent.prototype.onFormSubmit = function (form) {
        var _this = this;
        this.userService.addUser(this.newUser).subscribe(function (data) {
            if (data.success) {
                //show success message
                if (data.msg) {
                    _this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 1500 });
                }
                else {
                    _this.flashMessage.show("New user added to the system", { cssClass: 'alert-success', timeout: 1500 });
                }
                _this.router.navigate(['/home']);
            }
            else {
                if (data.msg) {
                    _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
                }
                else {
                    _this.flashMessage.show("You are not registered to the system", { cssClass: 'alert-danger', timeout: 1500 });
                }
                //reset form
                _this.resetForm(form);
            }
        });
    };
    SignupComponent.prototype.onCancelClick = function (form) {
        this.router.navigate(['/home']);
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-signup',
        template: __webpack_require__(249),
        styles: [__webpack_require__(229)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object])
], SignupComponent);

var _a, _b, _c;
//# sourceMappingURL=signup.component.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstructorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Service to handle forgot password RequestOptions
//This service mainly works with http requests








var InstructorService = (function () {
    function InstructorService(http, router, flashMessage, userService) {
        this.http = http;
        this.router = router;
        this.flashMessage = flashMessage;
        this.userService = userService;
        //REST api server address
        this.server = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* Config */].BACKEND_SERVER;
    }
    InstructorService.prototype.addInstructor = function (instructor) {
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        return this.http.post(this.server + 'instructor/add', JSON.stringify(instructor), { headers: headers }).map(function (res) { return res.json(); });
    };
    InstructorService.prototype.updateInstructorDetails = function (newInstructor) {
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        return this.http.post(this.server + 'instructor/update', JSON.stringify(newInstructor), { headers: headers }).map(function (res) { return res.json(); });
    };
    InstructorService.prototype.getInstructorProfile = function (username) {
        this.userService.validateToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.userService.loadToken());
        return this.http.get(this.server + 'instructor/profile', { headers: headers }).map(function (res) { return res.json(); });
    };
    return InstructorService;
}());
InstructorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__user_service__["a" /* UserService */]) === "function" && _d || Object])
], InstructorService);

var _a, _b, _c, _d;
//# sourceMappingURL=instructor.service.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordResetService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Service to handle forgot password RequestOptions
//This service mainly works with http requests







var PasswordResetService = (function () {
    function PasswordResetService(http, router, flashMessage) {
        this.http = http;
        this.router = router;
        this.flashMessage = flashMessage;
        //REST api server address
        this.server = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* Config */].BACKEND_SERVER;
    }
    //Function to send email using the backend rest api
    PasswordResetService.prototype.sendResetEmail = function (email) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.server + 'forgetpass/sendEmail', JSON.stringify(email), { headers: headers }).map(function (res) { return res.json(); });
    };
    //Function to verify the link clicked by user in the email
    PasswordResetService.prototype.verifyEmailLink = function (hash) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.server + 'forgetpass/sendEmail', JSON.stringify(hash), { headers: headers }).map(function (res) { return res.json(); });
    };
    //If link is verified then use this function to reset the password
    PasswordResetService.prototype.resetPassword = function (resetObject) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.server + 'forgetpass/resetPassword', JSON.stringify(resetObject), { headers: headers }).map(function (res) { return res.json(); });
    };
    return PasswordResetService;
}());
PasswordResetService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" && _c || Object])
], PasswordResetService);

var _a, _b, _c;
//# sourceMappingURL=password-reset.service.js.map

/***/ })

},[293]);
//# sourceMappingURL=main.bundle.js.map