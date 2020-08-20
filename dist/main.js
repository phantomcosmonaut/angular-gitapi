(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Classes.ts":
/*!****************************!*\
  !*** ./src/app/Classes.ts ***!
  \****************************/
/*! exports provided: PlotContainer, StatsDataIssue, GitResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlotContainer", function() { return PlotContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsDataIssue", function() { return StatsDataIssue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitResponse", function() { return GitResponse; });
class PlotContainer {
    constructor(id, body = null) {
        this.id = id;
        this.body = body;
    }
}
class StatsDataIssue {
    constructor(id, html_Url, daysToClose, comments, isOpen, labelsCount, assigneesCount) {
        this.id = id;
        this.html_Url = html_Url;
        this.daysToClose = daysToClose;
        this.comments = comments;
        this.isOpen = isOpen;
        this.labelsCount = labelsCount;
        this.assigneesCount = assigneesCount;
    }
}
class GitResponse {
    constructor() {
        this.labels = {};
        this.issues = new Array();
        this.pulls = new Array();
        this.users = {};
    }
    parseBody(body) {
        console.log("Deserialized json with " + body.length + " issues");
        body.forEach(issue => {
            let timeDelta = new Date(issue.closed_at).getTime() - new Date(issue.created_at).getTime();
            let numDays = Math.round(timeDelta / 1000 / 60 / 60 / 24);
            let issueData = new StatsDataIssue(issue.number, issue.html_url, numDays, issue.comments, issue.state.toLowerCase() === "open", issue.labels.length, issue.assignees.length);
            if (issue.pull_request) {
                this.issues.push(issueData);
            }
            else {
                this.pulls.push(issueData);
            }
            issue.labels.forEach(label => {
                if (this.labels.hasOwnProperty(label.name)) {
                    this.labels[label.name].count += 1;
                }
                else {
                    this.labels[label.name] = { name: label.name, color: label.color, count: 1 };
                }
            });
            let login = issue.user.login;
            let isPull = issue.pull_request != null;
            if (this.users.hasOwnProperty(login)) {
                this.users[login].pullCount += +(isPull);
                this.users[login].issueCount += +!(isPull);
            }
            else {
                this.addUser(issue.user);
                this.users[login].pullCount += +(isPull);
                this.users[login].issueCount += +!(isPull);
            }
            issue.assignees.forEach(user => {
                let login = issue.user.login;
                if (this.users.hasOwnProperty(login)) {
                    this.users[login].assignedCount += 1;
                }
                else {
                    this.addUser(user);
                    this.users[login].assignedCount += 1;
                }
            });
        });
        return this;
    }
    addUser(user) {
        var newUser = {
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            assignedCount: 0,
            pullCount: 0,
            issueCount: 0
        };
        this.users[user.login] = newUser;
    }
}


/***/ }),

/***/ "./src/app/Pipes/nullable.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/Pipes/nullable.pipe.ts ***!
  \****************************************/
/*! exports provided: NullablePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NullablePipe", function() { return NullablePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class NullablePipe {
    transform(value) {
        return value === null || value === undefined ? "-" : value;
    }
}
NullablePipe.ɵfac = function NullablePipe_Factory(t) { return new (t || NullablePipe)(); };
NullablePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "nullable", type: NullablePipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NullablePipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{ name: 'nullable' }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/Services/git.service.ts":
/*!*****************************************!*\
  !*** ./src/app/Services/git.service.ts ***!
  \*****************************************/
/*! exports provided: GitService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitService", function() { return GitService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _gitStorage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gitStorage.service */ "./src/app/Services/gitStorage.service.ts");








class GitService {
    constructor(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    get(repoId, etag, page) {
        let url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].githubapi + "repos/" + repoId + "/issues";
        let response = this.http.get(url, {
            withCredentials: false,
            responseType: "json",
            observe: "response",
            params: {
                state: "all",
                per_page: "50",
                page: page.toString()
            },
            headers: {
                "If-None-Match": etag,
            }
        });
        return response.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((err, caught) => this.handleError(err, caught)));
    }
    //data is the starting collection to which further data is appended
    getAll(repoId, data, numpages) {
        var httpArr = [];
        for (let pagenum = 2; pagenum <= numpages; pagenum++) {
            httpArr.push(this.get(repoId, "W/\"null\"", pagenum));
        }
        let finalResult = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(...httpArr)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["reduce"])((data, res) => {
            return data.parseBody(res.body);
        }, data));
        return finalResult;
    }
    static parseHeaders(headers) {
        if (headers.has("link")) {
            var links = headers.get("link").split(",");
            var numpages = GitService.parseLinks(links);
        }
        else {
            var numpages = 1;
        }
        var newHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            "x-rate": headers.get("x-ratelimit-limit"),
            "x-remaining": (+headers.get("x-ratelimit-remaining") - numpages + 1).toString(),
            "x-reset": headers.get("x-ratelimit-reset"),
            "etag": headers.get("etag")
        });
        return { headers: newHeaders, numpages: numpages };
    }
    static parseLinks(links) {
        let numpages = 1;
        var pageMatch = new RegExp("(?<=[&?]page=)\\d+", "i");
        links.forEach(link => {
            if (link.includes("rel=\"last\"")) {
                numpages = +pageMatch.exec(link)[0];
            }
        });
        console.log(numpages + " pages found.");
        return numpages;
    }
    handleError(error, caught) {
        switch (error.status) {
            case 304:
                var urlMatch = new RegExp("(?<=repos\/).+?(?=\/issues)", "i");
                let repoId = urlMatch.exec(error.url)[0];
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]({
                    body: this.storage.getDataByRepoId(repoId),
                    headers: null,
                    status: error.status,
                }));
            case 404:
            case 403:
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])("Repo Not Found or Access Denied.");
            default:
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error);
        }
    }
}
GitService.ɵfac = function GitService_Factory(t) { return new (t || GitService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_gitStorage_service__WEBPACK_IMPORTED_MODULE_5__["GitStorageService"])); };
GitService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GitService, factory: GitService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GitService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _gitStorage_service__WEBPACK_IMPORTED_MODULE_5__["GitStorageService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/Services/gitStorage.service.ts":
/*!************************************************!*\
  !*** ./src/app/Services/gitStorage.service.ts ***!
  \************************************************/
/*! exports provided: GitStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitStorageService", function() { return GitStorageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _Classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Classes */ "./src/app/Classes.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");




class GitStorageService {
    constructor(http) {
        this.http = http;
        this.reposArray = new Array();
        //storage format as follows: {repoId: etag | etag: data}
        for (var key in Object.keys(localStorage)) {
            let keyString = localStorage.key(+key);
            if (!keyString.startsWith("W/")) {
                let container = new _Classes__WEBPACK_IMPORTED_MODULE_1__["PlotContainer"](keyString);
                let etag = localStorage[keyString];
                container.body = JSON.parse(localStorage[etag]);
                this.reposArray.push(container);
            }
        }
    }
    SaveResponse(repoId, data) {
        //only store relavtively small datasets
        try {
            if (data.issues.length + data.pulls.length + Object.keys(data.users).length < 1000) {
                //check if an etag is already saved to storage and remove it
                var etag = localStorage.getItem(repoId);
                localStorage.setItem(etag, JSON.stringify(data));
            }
        }
        catch (error) {
            console.log("Local storage failed for: " + repoId);
        }
    }
    getDataByRepoId(repoId) {
        let etag = localStorage.getItem(repoId);
        return JSON.parse(localStorage.getItem(etag));
    }
    AddContainer(container) {
        this.reposArray.push(container);
    }
    FindContainer(id) {
        return this.reposArray.find(pc => pc.id === id);
    }
    GetContainers() {
        return this.reposArray;
    }
    RemoveContainer(container) {
        var ids = this.reposArray.map(pc => pc.id);
        var ind = ids.indexOf(container.id);
        this.reposArray.splice(ind, 1);
        let etag = localStorage.getItem(container.id);
        localStorage.removeItem(container.id);
        localStorage.removeItem(etag);
    }
    setEtag(repoId, etag) {
        localStorage.setItem(repoId, etag);
    }
    getEtag(repoId) {
        return localStorage.getItem(repoId);
    }
}
GitStorageService.ɵfac = function GitStorageService_Factory(t) { return new (t || GitStorageService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
GitStorageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GitStorageService, factory: GitStorageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GitStorageService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");





const routes = [
    { path: "", component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] },
    { path: "**", redirectTo: "/" }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const _c0 = function (a0, a1) { return { "open-nav": a0, "closed-nav": a1 }; };
const _c1 = function (a0, a1) { return { "open-border": a0, "closed-border": a1 }; };
class AppComponent {
    constructor() {
        this.title = 'Home';
        this.isOpen = false;
    }
    toggle(bool) {
        if (bool && this.isOpen) {
            this.isOpen = !this.isOpen;
        }
        else if (!bool) {
            this.isOpen = !this.isOpen;
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 16, vars: 8, consts: [["id", "nav-header", 3, "ngClass"], ["href", "http://brennanbugbee.com", "target", "_blank"], ["href", "http://games.brennanbugbee.com", "target", "_blank"], ["href", "http://github.com/phantomcosmonaut", "target", "_blank"], ["id", "header-wrapper", 3, "ngClass", "click"], ["id", "nav-border"], ["id", "header-pulldown"], [1, "trapezoid"], ["id", "tagline"], [3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Home Site");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Games");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Github");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_div_click_7_listener() { return ctx.toggle(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Explore");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_div_click_14_listener() { return ctx.toggle(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c0, ctx.isOpen, !ctx.isOpen));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](5, _c1, ctx.isOpen, !ctx.isOpen));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["#nav-header[_ngcontent-%COMP%] {\n  height: 70px;\n  transition: all ease 0.2s;\n  width: 100%;\n  z-index: 999;\n  position: fixed;\n  background-color: black;\n  text-align: center;\n  color: white;\n  overflow: hidden;\n}\n\n.closed-nav[_ngcontent-%COMP%] {\n  top: -70px;\n}\n\n.open-nav[_ngcontent-%COMP%] {\n  top: 0px;\n}\n\n.open-border[_ngcontent-%COMP%] {\n  transition: all ease 0.2s;\n  top: 70px;\n}\n\n.closed-border[_ngcontent-%COMP%] {\n  top: 0px;\n}\n\n#header-wrapper[_ngcontent-%COMP%] {\n  transition: all ease 0.2s;\n  z-index: 1000;\n  position: fixed;\n  transition: all ease 0.2s;\n  width: 100%;\n  cursor: pointer;\n}\n\n#nav-border[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  top: 0;\n  height: 10px;\n  background-color: #1c1c79;\n}\n\n#header-pulldown[_ngcontent-%COMP%] {\n  top: 10px;\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 0%);\n  text-align: center;\n}\n\n#tagline[_ngcontent-%COMP%] {\n  top: 0;\n  line-height: 30px;\n  left: 50%;\n  transform: translate(-50%, 0%);\n  position: absolute;\n  font-size: 26px;\n  color: white;\n}\n\n.trapezoid[_ngcontent-%COMP%] {\n  border-top: 40px solid #1c1c79;\n  border-left: 40px solid transparent;\n  border-right: 40px solid transparent;\n  height: 0;\n  width: 240px;\n  position: relative;\n}\n\nnav[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin: 10px 10px 10px 0;\n  font-size: 30px;\n  display: inline-block;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:not(:last-child)::after {\n  content: \" |\";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNFLHlCQUFBO0VBQ0YsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUNBO0VBQ0csVUFBQTtBQUVIOztBQUFBO0VBQ0UsUUFBQTtBQUdGOztBQUFBO0VBQ0UseUJBQUE7RUFDQSxTQUFBO0FBR0Y7O0FBREE7RUFDRSxRQUFBO0FBSUY7O0FBRkE7RUFDRSx5QkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUtGOztBQURBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsTUFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtBQUlGOztBQUFBO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFHRjs7QUFDQTtFQUNFLE1BQUE7RUFDQSxpQkFBQTtFQUNBLFNBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUFFRjs7QUFDQTtFQUNFLDhCQUFBO0VBQ0EsbUNBQUE7RUFDQSxvQ0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFFRjs7QUFBQTtFQUNFLFlBQUE7QUFHRjs7QUFEQTtFQUNFLHdCQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FBSUY7O0FBRkE7RUFDRSxhQUFBO0FBS0YiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbmF2LWhlYWRlciB7XHJcbiAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIGVhc2UgLjJzO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbi5jbG9zZWQtbmF2e1xyXG4gICB0b3A6IC03MHB4O1xyXG59XHJcbi5vcGVuLW5hdiB7XHJcbiAgdG9wOiAwcHg7XHJcbn1cclxuXHJcbi5vcGVuLWJvcmRlciB7XHJcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UgLjJzO1xyXG4gIHRvcDogNzBweDtcclxufVxyXG4uY2xvc2VkLWJvcmRlcntcclxuICB0b3A6IDBweDtcclxufVxyXG4jaGVhZGVyLXdyYXBwZXIge1xyXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlIC4ycztcclxuICB6LWluZGV4OiAxMDAwO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZSAuMnM7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxufVxyXG5cclxuI25hdi1ib3JkZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMTAwJTtcclxuICB0b3A6IDA7XHJcbiAgaGVpZ2h0OiAxMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyOCwgMjgsIDEyMSk7XHJcblxyXG59XHJcblxyXG4jaGVhZGVyLXB1bGxkb3duIHtcclxuICB0b3A6IDEwcHg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwJSk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxufVxyXG5cclxuI3RhZ2xpbmUge1xyXG4gIHRvcDogMDtcclxuICBsaW5lLWhlaWdodDogMzBweDtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMCUpO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBmb250LXNpemU6IDI2cHg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4udHJhcGV6b2lkIHtcclxuICBib3JkZXItdG9wOiA0MHB4IHNvbGlkIHJnYigyOCwgMjgsIDEyMSk7XHJcbiAgYm9yZGVyLWxlZnQ6IDQwcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgYm9yZGVyLXJpZ2h0OiA0MHB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gIGhlaWdodDogMDtcclxuICB3aWR0aDogMjQwcHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbm5hdntcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxubmF2IGF7XHJcbiAgbWFyZ2luOiAxMHB4IDEwcHggMTBweCAwO1xyXG4gIGZvbnQtc2l6ZTogMzBweDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxubmF2IGE6bm90KDpsYXN0LWNoaWxkKTo6YWZ0ZXJ7XHJcbiAgY29udGVudDogXCIgfFwiO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _plate_spinner_plate_spinner_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plate-spinner/plate-spinner.component */ "./src/app/plate-spinner/plate-spinner.component.ts");
/* harmony import */ var _git_repo_git_repo_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./git-repo/git-repo.component */ "./src/app/git-repo/git-repo.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _usersplot_usersplot_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./usersplot/usersplot.component */ "./src/app/usersplot/usersplot.component.ts");
/* harmony import */ var _labelsplot_labelsplot_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./labelsplot/labelsplot.component */ "./src/app/labelsplot/labelsplot.component.ts");
/* harmony import */ var _Pipes_nullable_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Pipes/nullable.pipe */ "./src/app/Pipes/nullable.pipe.ts");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./test/test.component */ "./src/app/test/test.component.ts");
/* harmony import */ var _issuesplot_issuesplot_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./issuesplot/issuesplot.component */ "./src/app/issuesplot/issuesplot.component.ts");
















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
        _plate_spinner_plate_spinner_component__WEBPACK_IMPORTED_MODULE_7__["PlateSpinnerComponent"],
        _git_repo_git_repo_component__WEBPACK_IMPORTED_MODULE_8__["GitRepoComponent"],
        _labelsplot_labelsplot_component__WEBPACK_IMPORTED_MODULE_11__["LabelsPlotComponent"],
        _usersplot_usersplot_component__WEBPACK_IMPORTED_MODULE_10__["UsersPlotComponent"],
        _Pipes_nullable_pipe__WEBPACK_IMPORTED_MODULE_12__["NullablePipe"],
        _test_test_component__WEBPACK_IMPORTED_MODULE_13__["TestComponent"],
        _issuesplot_issuesplot_component__WEBPACK_IMPORTED_MODULE_14__["IssuesplotComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
                    _plate_spinner_plate_spinner_component__WEBPACK_IMPORTED_MODULE_7__["PlateSpinnerComponent"],
                    _git_repo_git_repo_component__WEBPACK_IMPORTED_MODULE_8__["GitRepoComponent"],
                    _labelsplot_labelsplot_component__WEBPACK_IMPORTED_MODULE_11__["LabelsPlotComponent"],
                    _usersplot_usersplot_component__WEBPACK_IMPORTED_MODULE_10__["UsersPlotComponent"],
                    _Pipes_nullable_pipe__WEBPACK_IMPORTED_MODULE_12__["NullablePipe"],
                    _test_test_component__WEBPACK_IMPORTED_MODULE_13__["TestComponent"],
                    _issuesplot_issuesplot_component__WEBPACK_IMPORTED_MODULE_14__["IssuesplotComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/git-repo/git-repo.component.ts":
/*!************************************************!*\
  !*** ./src/app/git-repo/git-repo.component.ts ***!
  \************************************************/
/*! exports provided: GitRepoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitRepoComponent", function() { return GitRepoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _Services_git_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Services/git.service */ "./src/app/Services/git.service.ts");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-transition */ "./node_modules/d3-transition/src/index.js");
/* harmony import */ var _Classes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Classes */ "./src/app/Classes.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _Services_gitStorage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Services/gitStorage.service */ "./src/app/Services/gitStorage.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _usersplot_usersplot_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../usersplot/usersplot.component */ "./src/app/usersplot/usersplot.component.ts");
/* harmony import */ var _labelsplot_labelsplot_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../labelsplot/labelsplot.component */ "./src/app/labelsplot/labelsplot.component.ts");
/* harmony import */ var _issuesplot_issuesplot_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../issuesplot/issuesplot.component */ "./src/app/issuesplot/issuesplot.component.ts");














const _c0 = ["Labels"];
const _c1 = ["Users"];
const _c2 = ["comments"];
const _c3 = ["dtc"];
function GitRepoComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Search Github repositories to explore new data visualizations");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c4 = function (a0) { return { "active-repo": a0 }; };
function GitRepoComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GitRepoComponent_div_8_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const repo_r7 = ctx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.SelectContainer(repo_r7.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const repo_r7 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c4, ctx_r1.currentContainer === repo_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](repo_r7.id.slice(0, repo_r7.id.indexOf("/")));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](repo_r7.id.slice(repo_r7.id.indexOf("/") + 1, repo_r7.id.length));
} }
function GitRepoComponent_span_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Time Till Reset: ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, ctx_r2.resetTime, "shortTime"), "");
} }
function GitRepoComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, "Time Till Reset: -");
} }
function GitRepoComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GitRepoComponent_div_21_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Add Repos To See Results");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GitRepoComponent_div_21_ng_template_8_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Users");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-usersplot", 30, 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Labels Count");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "app-labelsplot", 32, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Comments");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "app-issuesplot", 34, 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("users", ctx_r13.users);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("labels", ctx_r13.labels)("repoUrl", ctx_r13.url);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("property", "comments")("data", ctx_r13.currentContainer.body);
} }
function GitRepoComponent_div_21_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, GitRepoComponent_div_21_ng_template_8_div_0_Template, 17, 5, "div", 26);
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r12.currentContainer);
} }
function GitRepoComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GitRepoComponent_div_21_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.DeleteRepo(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, GitRepoComponent_div_21_div_7_Template, 4, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, GitRepoComponent_div_21_ng_template_8_Template, 1, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](9);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r6.currentContainer.id, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.repos.length === 0 && !ctx_r6.loading)("ngIfElse", _r11);
} }
class GitRepoComponent {
    constructor(git, formBuilder, storage) {
        this.git = git;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.loading = false;
        this.repoForm = this.formBuilder.group({
            owner: "",
            repo: ""
        });
    }
    get issues() {
        return this.currentContainer.body.issues;
    }
    get pulls() {
        return this.currentContainer.body.pulls;
    }
    get labels() {
        return this.currentContainer.body.labels;
    }
    get users() {
        return this.currentContainer.body.users;
    }
    get repos() {
        return this.storage.GetContainers();
    }
    get resetTime() {
        var _a, _b;
        return ((_a = this.headers) === null || _a === void 0 ? void 0 : _a.has("x-reset")) ? new Date(+((_b = this.headers) === null || _b === void 0 ? void 0 : _b.get("x-reset")) * 1000) : null;
    }
    get remaining() {
        var _a;
        return ((_a = this.headers) === null || _a === void 0 ? void 0 : _a.has("x-remaining")) ? this.headers.get("x-remaining") : "-";
    }
    get url() {
        return "https://github.com/" + this.currentContainer.id;
    }
    get formOwner() {
        return this.repoForm.get('owner').value;
    }
    get formRepo() {
        return this.repoForm.get('repo').value;
    }
    ngAfterViewInit() {
        //create tooltip
        const xrate = document.getElementById("rate-info-q");
        const xrateContent = document.getElementById("rate-info-q-content");
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(xrate, "mouseenter").subscribe((event) => {
            var offset = xrate.offsetTop;
            xrateContent.style.top = (offset + 20).toString() + "px";
            xrateContent.style.display = "block";
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(xrate, "mouseleave").subscribe(() => {
            xrateContent.style.display = "none";
        });
    }
    SelectContainer(id) {
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["selectAll"])("svg > *").remove();
        this.currentContainer = this.storage.FindContainer(id);
        if (this.userComponent) {
            this.userComponent.Refresh(this.users);
            this.labelComponent.Refresh(this.labels, this.url);
            this.commentsComponent.Refresh(this.currentContainer.body);
        }
    }
    GetRepo() {
        var _a;
        let owner = this.formOwner;
        let repoName = this.formRepo;
        this.currentContainer = null;
        this.loading = true;
        let repoId = owner + "/" + repoName;
        let etag = (_a = this.storage.getEtag(repoId)) !== null && _a !== void 0 ? _a : "\"PeanutButterJelly\"";
        var response = this.git.get(repoId, etag, 1);
        response.subscribe(res => {
            if (res.status === 304) {
                this.UpdateRepos(repoId, this.storage.getDataByRepoId(repoId));
                this.loading = false;
            }
            else {
                var headerInfo = _Services_git_service__WEBPACK_IMPORTED_MODULE_1__["GitService"].parseHeaders(res.headers);
                if (+headerInfo.headers.get("x-remaining") < headerInfo.numpages) {
                    throw new Error("Rate limit exceeded.");
                }
                let data = new _Classes__WEBPACK_IMPORTED_MODULE_3__["GitResponse"]();
                data.parseBody(res.body);
                this.storage.setEtag(repoId, headerInfo.headers.get("etag"));
                this.headers = headerInfo.headers;
                let gitResponse = this.git.getAll(repoId, data, headerInfo.numpages);
                gitResponse.subscribe(finalResult => {
                    this.storage.SaveResponse(repoId, finalResult);
                    this.UpdateRepos(repoId, finalResult);
                    this.loading = false;
                });
            }
        }, error => {
            this.Toaster(error);
            this.loading = false;
        });
    }
    UpdateRepos(repoId, data) {
        let container = this.storage.FindContainer(repoId);
        if (!container) {
            container = new _Classes__WEBPACK_IMPORTED_MODULE_3__["PlotContainer"](repoId);
            this.storage.AddContainer(container);
        }
        container.body = data;
        this.SelectContainer(container.id);
    }
    DeleteRepo() {
        this.storage.RemoveContainer(this.currentContainer);
        this.currentContainer = null;
        this.Toaster("Repo Deleted");
    }
    Toaster(message) {
        console.log(message);
    }
}
GitRepoComponent.ɵfac = function GitRepoComponent_Factory(t) { return new (t || GitRepoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_Services_git_service__WEBPACK_IMPORTED_MODULE_1__["GitService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_Services_gitStorage_service__WEBPACK_IMPORTED_MODULE_7__["GitStorageService"])); };
GitRepoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GitRepoComponent, selectors: [["app-git-repo"]], viewQuery: function GitRepoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c3, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.labelComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.userComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.commentsComponent = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dtcComponent = _t.first);
    } }, decls: 22, vars: 9, consts: [["id", "repo-top-bar", 1, "row", "justify-content-center", "m-2"], ["id", "repoForm", 3, "formGroup", "ngSubmit"], ["type", "text", "formControlName", "owner", "placeholder", "owner"], ["type", "text", "formControlName", "repo", "placeholder", "repo"], ["type", "submit", "value", "Search", 1, "btn", "btn-info", 3, "disabled"], ["id", "repo-list", 1, "d-flex", "align-items-center", "justify-content-center"], [4, "ngIf"], ["class", "repo btn-info", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["id", "x-rate-info", 1, "row", "justify-content-center"], [1, "mr-4"], [4, "ngIf", "ngIfElse"], ["otherTime", ""], ["id", "rate-info-q", 1, "info-icon", "my-auto"], ["id", "rate-info-q-content", 1, "custom-tooltip"], ["id", "loading", "class", "d-flex justify-content-center mt-5", 4, "ngIf"], ["class", "repo-container mt-2 p-2", 4, "ngIf"], [1, "repo", "btn-info", 3, "ngClass", "click"], [1, "list-unstyled", "m-0"], ["id", "loading", 1, "d-flex", "justify-content-center", "mt-5"], ["src", "../../assets/nyancat.gif", "height", "120px"], [1, "repo-container", "mt-2", "p-2"], ["height", "35", "src", "https://img.icons8.com/ios-filled/50/000000/repository.png"], [1, "btn-sm", "btn-danger", "ml-2", 3, "click"], [1, "repo-body"], ["showPlots", ""], ["id", "emptyArr"], ["id", "plot-container", "class", "", 4, "ngIf"], ["id", "plot-container", 1, ""], ["id", "graph-area", 1, "row", "justify-content-center"], [1, "card", "m-2", "text-center"], ["id", "usersplot", 3, "users"], ["Users", ""], [3, "labels", "repoUrl"], ["Labels", ""], [3, "property", "data"], ["comments", ""]], template: function GitRepoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function GitRepoComponent_Template_form_ngSubmit_1_listener() { return ctx.GetRepo(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, GitRepoComponent_div_7_Template, 3, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, GitRepoComponent_div_8_Template, 8, 5, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, GitRepoComponent_span_12_Template, 3, 4, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, GitRepoComponent_ng_template_13_Template, 1, 0, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Github limits the number of requests you can make to their server every hour. Account authentication is required to increase that limit. Searching for a repo requires multiple requests which may exceed your current rate limit. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, GitRepoComponent_div_20_Template, 2, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, GitRepoComponent_div_21_Template, 10, 3, "div", 15);
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.repoForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.loading || ctx.formRepo === "" || ctx.formOwner === "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.repos.length === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.repos);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Requests: ", ctx.remaining, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.resetTime)("ngIfElse", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.currentContainer);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgClass"], _usersplot_usersplot_component__WEBPACK_IMPORTED_MODULE_9__["UsersPlotComponent"], _labelsplot_labelsplot_component__WEBPACK_IMPORTED_MODULE_10__["LabelsPlotComponent"], _issuesplot_issuesplot_component__WEBPACK_IMPORTED_MODULE_11__["IssuesplotComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["DatePipe"]], styles: [".repo[_ngcontent-%COMP%] {\n  transition: all 0.2s;\n  text-align: center;\n  height: auto;\n  min-width: 100px;\n  width: auto;\n  border-radius: 5%;\n  margin: 0 10px 0 10px;\n  font-size: 22px;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.active-repo[_ngcontent-%COMP%] {\n  border: 2px solid black;\n  pointer-events: none;\n}\n\n.repo[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n\n#repo-list[_ngcontent-%COMP%] {\n  overflow: auto;\n  height: 130px;\n  width: 100%;\n  padding: 0 15px 0 15px;\n  background-color: #e6e6e6;\n}\n\ninput[type=text][_ngcontent-%COMP%] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n       appearance: none;\n  outline: none;\n  border: 0px;\n  border-bottom: 3px solid rgba(23, 162, 184, 0.5);\n  border-radius: 0;\n  padding: 4px 4px 4px 8px;\n  margin: 6px;\n}\n\ninput[type=text][_ngcontent-%COMP%]:focus {\n  outline: none;\n  border: 0;\n  border-bottom: 3px solid #17a2b8;\n}\n\n#x-rate-info[_ngcontent-%COMP%] {\n  padding: 8px;\n  width: auto;\n  color: black;\n}\n\n#repo-top-bar[_ngcontent-%COMP%] {\n  margin-top: 40px;\n  padding: 10px 0 10px 0;\n}\n\n.repo-container[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n#graph-area[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0;\n}\n\n.info-icon[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  border-radius: 50%;\n  border: 2px solid grey;\n  color: grey;\n  text-align: center;\n  line-height: 0.9;\n}\n\n.custom-tooltip[_ngcontent-%COMP%] {\n  border: 1px solid grey;\n  z-index: 100;\n  top: 0;\n  box-shadow: 0px 0px 10px grey;\n  background: white;\n  transition: opacity 0.3s;\n  padding: 8px;\n  max-width: 400px;\n  color: black;\n  position: absolute;\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2l0LXJlcG8vZ2l0LXJlcG8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7RUFDSSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUFISjs7QUFLQTtFQUNJLHVCQUFBO0VBQ0Esb0JBQUE7QUFGSjs7QUFJQTtFQUNJLHNCQUFBO0FBREo7O0FBR0E7RUFDSSxjQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQTFCQztBQTBCTDs7QUFFQTtFQUNJLHdCQUFBO0VBQ0EscUJBQUE7T0FBQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsZ0RBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNBO0VBQ0ksYUFBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtBQUVKOztBQUFBO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBR0o7O0FBREE7RUFDSSxnQkFBQTtFQUNBLHNCQUFBO0FBSUo7O0FBRkE7RUFDSSxXQUFBO0FBS0o7O0FBSEE7RUFDSSxXQUFBO0VBQ0EsU0FBQTtBQU1KOztBQUpBO0VBQ0ksaUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBT0o7O0FBTEE7RUFDSSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxNQUFBO0VBQ0EsNkJBQUE7RUFDQSxpQkFBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQVFKIiwiZmlsZSI6InNyYy9hcHAvZ2l0LXJlcG8vZ2l0LXJlcG8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYnJkMTogcmdiYSgyMywgMTYyLCAxODQsIDAuNSk7XHJcbiRicmQyOiByZ2JhKDIzLCAxNjIsIDE4NCwgMSk7XHJcbiRsZzogcmdiKDIzMCwyMzAsMjMwKTtcclxuXHJcbi5yZXBve1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBtaW4td2lkdGg6IDEwMHB4O1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBib3JkZXItcmFkaXVzOiA1JTtcclxuICAgIG1hcmdpbjogMCAxMHB4IDAgMTBweDtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLmFjdGl2ZS1yZXBve1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTs7XHJcbn1cclxuLnJlcG86aG92ZXJ7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xyXG59XHJcbiNyZXBvLWxpc3R7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIGhlaWdodDogMTMwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDAgMTVweCAwIDE1cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbGc7XHJcbn1cclxuaW5wdXRbdHlwZT10ZXh0XXtcclxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICAgIGFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyOiAwcHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgJGJyZDE7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgcGFkZGluZzogNHB4IDRweCA0cHggOHB4O1xyXG4gICAgbWFyZ2luOiA2cHg7XHJcbn1cclxuaW5wdXRbdHlwZT10ZXh0XTpmb2N1c3tcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXI6MDtcclxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAkYnJkMjtcclxufVxyXG4jeC1yYXRlLWluZm97XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG4jcmVwby10b3AtYmFye1xyXG4gICAgbWFyZ2luLXRvcDogNDBweDtcclxuICAgIHBhZGRpbmc6IDEwcHggMCAxMHB4IDA7XHJcbn1cclxuLnJlcG8tY29udGFpbmVye1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuI2dyYXBoLWFyZWF7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG4uaW5mby1pY29ue1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGdyZXk7XHJcbiAgICBjb2xvcjogZ3JleTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGxpbmUtaGVpZ2h0OiAwLjk7XHJcbn1cclxuLmN1c3RvbS10b29sdGlwe1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JleTtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuICAgIHRvcDowO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCAxMHB4IGdyZXk7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIG1heC13aWR0aDogNDAwcHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GitRepoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-git-repo',
                templateUrl: './git-repo.component.html',
                styleUrls: ['./git-repo.component.scss'],
            }]
    }], function () { return [{ type: _Services_git_service__WEBPACK_IMPORTED_MODULE_1__["GitService"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] }, { type: _Services_gitStorage_service__WEBPACK_IMPORTED_MODULE_7__["GitStorageService"] }]; }, { labelComponent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['Labels']
        }], userComponent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['Users']
        }], commentsComponent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['comments']
        }], dtcComponent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['dtc']
        }] }); })();


/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _git_repo_git_repo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../git-repo/git-repo.component */ "./src/app/git-repo/git-repo.component.ts");




class HomeComponent {
    constructor(titleService) {
        this.titleService = titleService;
        this.titleService.setTitle("BB.com");
    }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"])); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 3, vars: 0, consts: [["id", "content"], [1, "wrapper"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-git-repo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_git_repo_git_repo_component__WEBPACK_IMPORTED_MODULE_2__["GitRepoComponent"]], styles: ["body[_ngcontent-%COMP%] {\n  font-family: \"Libre Baskerville\", serif;\n  margin: 0;\n}\n\n#american-house[_ngcontent-%COMP%] {\n  border-bottom: 8px solid #1c1c79;\n  padding-top: 16.12%;\n  margin-top: 70px;\n  width: 100%;\n  background-image: url(\"https://media.foxbusiness.com/BrightCove/854081161001/201806/3931/854081161001_5792509571001_5792512021001-vs.jpg\");\n  background-position: center 70px;\n  background-attachment: fixed;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-color: #1c1c79;\n}\n\n@media (max-width: 900px) {\n  #american-house[_ngcontent-%COMP%] {\n    background-size: auto;\n    height: 160px;\n  }\n}\n\n#content[_ngcontent-%COMP%] {\n  margin-top: 50px;\n  height: auto;\n}\n\n.wrapper[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin-left: auto;\n  margin-right: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksdUNBQUE7RUFDQSxTQUFBO0FBQ0o7O0FBRUU7RUFDRSxnQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsMElBQUE7RUFDQSxnQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsNEJBQUE7RUFDQSx3QkFBQTtFQUNBLHlCQUFBO0FBQ0o7O0FBRUU7RUFDRTtJQUNFLHFCQUFBO0lBQ0EsYUFBQTtFQUNKO0FBQ0Y7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLFlBQUE7QUFBSjs7QUFFQTtFQUNJLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHl7XHJcbiAgICBmb250LWZhbWlseTogJ0xpYnJlIEJhc2tlcnZpbGxlJywgc2VyaWY7XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbiAgI2FtZXJpY2FuLWhvdXNlIHtcclxuICAgIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCByZ2IoMjgsIDI4LCAxMjEpO1xyXG4gICAgcGFkZGluZy10b3A6IDE2LjEyJTtcclxuICAgIG1hcmdpbi10b3A6IDcwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImh0dHBzOi8vbWVkaWEuZm94YnVzaW5lc3MuY29tL0JyaWdodENvdmUvODU0MDgxMTYxMDAxLzIwMTgwNi8zOTMxLzg1NDA4MTE2MTAwMV81NzkyNTA5NTcxMDAxXzU3OTI1MTIwMjEwMDEtdnMuanBnXCIpO1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIDcwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGZpeGVkO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyOCwgMjgsIDEyMSk7XHJcbiAgfVxyXG4gIFxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkge1xyXG4gICAgI2FtZXJpY2FuLWhvdXNlIHtcclxuICAgICAgYmFja2dyb3VuZC1zaXplOiBhdXRvO1xyXG4gICAgICBoZWlnaHQ6IDE2MHB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiNjb250ZW50e1xyXG4gICAgbWFyZ2luLXRvcDogNTBweDtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG4ud3JhcHBlcntcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG5cclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.scss'],
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"] }]; }, null); })();


/***/ }),

/***/ "./src/app/issuesplot/issuesplot.component.ts":
/*!****************************************************!*\
  !*** ./src/app/issuesplot/issuesplot.component.ts ***!
  \****************************************************/
/*! exports provided: IssuesplotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IssuesplotComponent", function() { return IssuesplotComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
/* harmony import */ var d3_axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-axis */ "./node_modules/d3-axis/src/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/index.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");







class IssuesplotComponent {
    constructor() {
        this.margin = { top: 10, right: 10, bottom: 10, left: 10 };
    }
    ngOnInit() {
        if (this.data.issues[0][this.property] === undefined) {
            throw new Error("invalid property accessor: " + this.property + ". Valid properties are: " + Object.keys(this.data.issues[0]));
        }
    }
    ngAfterViewInit() {
        this.DrawPlot();
    }
    Refresh(data) {
        this.data = data;
        this.DrawPlot();
    }
    DrawPlot() {
        var issueData = this.data.issues.map(i => i[this.property]);
        var pullData = this.data.pulls.map(p => p[this.property]);
        var margin = this.margin;
        var svg = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])('#issuesplot-' + this.property);
        var width = +svg.attr('width') - margin.left - margin.right;
        var height = +svg.attr('height') - margin.top - margin.bottom;
        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        var x_max = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])([Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(issueData), Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(pullData)]);
        var x = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"])()
            .domain([0, x_max])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisBottom"])(x));
        var kde = this.kernelDensityEstimator(this.kernelEpanechnikov(2), x.ticks(50));
        var density1 = kde(issueData);
        var density2 = kde(pullData);
        var y_max = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])([Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(density1.map(d => d[1])), Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(density2.map(d => d[1]))]) + 0.05;
        var y = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"])()
            .range([height, 0])
            .domain([0, y_max]);
        svg.append("g")
            .call(Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisLeft"])(y));
        svg.append("text").attr("x", width - 80).attr("y", 40).text("Issues").attr("fill", "#b83333").style("font-size", "25px");
        svg.append("text").attr("x", width - 80).attr("y", 80).text("Pulls").attr("fill", "#3333b8").style("font-size", "25px");
        // Plot the area
        svg.append("path")
            .attr("class", "mypath")
            .datum(density1)
            .attr("stroke", "#b83333")
            .attr("stroke-width", 4)
            .attr("fill-opacity", 0)
            .attr("stroke-linejoin", "round")
            .attr("d", Object(d3__WEBPACK_IMPORTED_MODULE_5__["line"])()
            .curve(d3__WEBPACK_IMPORTED_MODULE_5__["curveBasis"])
            .x((d) => x(d[0]))
            .y((d) => y(d[1])));
        // Plot the area
        svg.append("path")
            .attr("class", "mypath")
            .datum(density2)
            .attr("stroke", "#3333b8")
            .attr("fill-opacity", 0)
            .attr("stroke-width", 4)
            .attr("stroke-linejoin", "round")
            .attr("d", Object(d3__WEBPACK_IMPORTED_MODULE_5__["line"])()
            .curve(d3__WEBPACK_IMPORTED_MODULE_5__["curveBasis"])
            .x((d) => x(d[0]))
            .y((d) => y(d[1])));
    }
    // Function to compute density
    kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(function (x) {
                return [x, Object(d3__WEBPACK_IMPORTED_MODULE_5__["mean"])(V, function (v) { return kernel(x - v); })];
            });
        };
    }
    kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }
}
IssuesplotComponent.ɵfac = function IssuesplotComponent_Factory(t) { return new (t || IssuesplotComponent)(); };
IssuesplotComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: IssuesplotComponent, selectors: [["app-issuesplot"]], inputs: { data: "data", property: "property" }, decls: 2, vars: 1, consts: [[1, "bg-light"], ["width", "650", "height", "400", 3, "id"]], template: function IssuesplotComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("id", "issuesplot-", ctx.property, "");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2lzc3Vlc3Bsb3QvaXNzdWVzcGxvdC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](IssuesplotComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-issuesplot',
                templateUrl: './issuesplot.component.html',
                styleUrls: ['./issuesplot.component.scss']
            }]
    }], function () { return []; }, { data: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], property: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/labelsplot/labelsplot.component.ts":
/*!****************************************************!*\
  !*** ./src/app/labelsplot/labelsplot.component.ts ***!
  \****************************************************/
/*! exports provided: LabelsPlotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelsPlotComponent", function() { return LabelsPlotComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
/* harmony import */ var d3_axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-axis */ "./node_modules/d3-axis/src/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/index.js");






class LabelsPlotComponent {
    constructor() {
        this.margin = { top: 10, right: 30, bottom: 10, left: 150 };
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.DrawPlot();
    }
    Refresh(labels, url) {
        this.labels = labels;
        this.repoUrl = url;
        this.DrawPlot();
    }
    DrawPlot() {
        var labels = this.labels;
        var margin = this.margin;
        var data = Object.keys(labels);
        data.sort((a, b) => labels[a].count - labels[b].count);
        var svg = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])('#labels');
        var width = +svg.attr('width') - margin.left - margin.right;
        var height = +svg.attr('height') - margin.top - margin.bottom;
        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        var y = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleBand"])().rangeRound([height, 0]).padding(0);
        var x = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"])().rangeRound([0, width]);
        y.domain(data.map((d) => d));
        x.domain([0, Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(Object.values(labels), (label) => label.count)]);
        g.append('g')
            .attr('class', 'axis y-axis')
            .call(Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisLeft"])(y));
        var bars = g.selectAll('.bar')
            .data(data)
            .enter();
        bars.append('a')
            .attr('href', (d) => this.repoUrl + "/issues?q=label%3A" + "\"" + d + "\"")
            .attr('target', "_blank")
            .append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', (d) => y(d))
            .attr('height', y.bandwidth())
            .attr('fill', (d) => "#" + labels[d].color)
            .on("mouseover", function () {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["selectAll"])(".bar")
                .attr("fill", "lightgrey");
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this)
                .attr("fill", (d) => "#" + labels[d].color);
        })
            .on("mouseout", function () {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["selectAll"])(".bar").attr("fill", (d) => "#" + labels[d].color);
        })
            .transition()
            .duration(1000)
            .attr('width', (d) => x(labels[d].count));
        bars.append("text")
            .attr('class', 'label')
            .attr("y", (d) => y(d) + y.bandwidth() / 2 + 4)
            .text((d) => labels[d].count)
            .attr('x', 3)
            .transition()
            .duration(1000)
            .attr('x', (d) => x(labels[d].count) + 3);
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["selectAll"])(".axis>.tick>text")
            .each(function (d, i) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this).style("font-size", "15px");
        });
    }
}
LabelsPlotComponent.ɵfac = function LabelsPlotComponent_Factory(t) { return new (t || LabelsPlotComponent)(); };
LabelsPlotComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LabelsPlotComponent, selectors: [["app-labelsplot"]], inputs: { labels: "labels", repoUrl: "repoUrl" }, decls: 2, vars: 0, consts: [[1, "bg-light"], ["width", "700", "height", "400", "id", "labels"]], template: function LabelsPlotComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".axis[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGFiZWxzcGxvdC9sYWJlbHNwbG90LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtBQUNKIiwiZmlsZSI6InNyYy9hcHAvbGFiZWxzcGxvdC9sYWJlbHNwbG90LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmF4aXN7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LabelsPlotComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-labelsplot',
                templateUrl: './labelsplot.component.html',
                styleUrls: ['./labelsplot.component.scss']
            }]
    }], function () { return []; }, { labels: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], repoUrl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/plate-spinner/plate-spinner.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/plate-spinner/plate-spinner.component.ts ***!
  \**********************************************************/
/*! exports provided: PlateSpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlateSpinnerComponent", function() { return PlateSpinnerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _plate_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plate-spinner */ "./src/app/plate-spinner/plate-spinner.ts");



class PlateSpinnerComponent {
    constructor() { }
    ngOnInit() {
        var spinner = new _plate_spinner__WEBPACK_IMPORTED_MODULE_1__["Spinner"]("#slideshow", ".slide");
    }
}
PlateSpinnerComponent.ɵfac = function PlateSpinnerComponent_Factory(t) { return new (t || PlateSpinnerComponent)(); };
PlateSpinnerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlateSpinnerComponent, selectors: [["app-plate-spinner"]], decls: 51, vars: 0, consts: [[1, "row"], ["id", "slideshow", 1, "col-auto"], [1, "slide"], ["id", "sliders", 1, "col-auto"], [1, "slider-table"], ["id", "ellipseX-value"], ["id", "ellipseY-value"], ["id", "leftPad-value"], ["id", "topPad-value"], ["id", "depth-value"], ["id", "ellipseX", "data-target", "#ellipseX-value", 1, "slider"], ["id", "ellipseY", "data-target", "#ellipseY-value", 1, "slider"], ["id", "leftPad", "data-target", "#leftPad-value", 1, "slider"], ["id", "topPad", "data-target", "#topPad-value", 1, "slider"], ["id", "depth", "data-target", "#depth-value", 1, "slider"]], template: function PlateSpinnerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " A ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " B ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " C ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " D ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "table", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "EllipseX");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "EllipseY");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Left Pad");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Top Pad");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Depth");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#slideshow[_ngcontent-%COMP%] {\n  margin: 50px;\n  height: 300px;\n  width: 600px;\n  background-color: lightgrey;\n  cursor: grab;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n}\n\n.slide[_ngcontent-%COMP%] {\n  text-align: center;\n  color: white;\n  font-size: 30px;\n  line-height: 90px;\n  position: absolute;\n  border: 5px solid #8c77f7;\n  display: inline-block;\n  background-color: #4937a6;\n  height: 100px;\n  width: 100px;\n}\n\n.slider[_ngcontent-%COMP%] {\n  width: 10px;\n  margin: 10px auto 10px auto;\n  background: #cccccc;\n  border: 1px solid grey !important;\n}\n\n.slider[_ngcontent-%COMP%]   .ui-slider-handle[_ngcontent-%COMP%] {\n  background: #4937a6;\n  border-radius: 50%;\n}\n\n.slider[_ngcontent-%COMP%]   .ui-slider-handle[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0px 2px #8c77f7;\n  outline: none;\n}\n\n.slider-table[_ngcontent-%COMP%] {\n  margin: 50px 0px 50px 0px;\n  padding: 5px;\n  text-align: center;\n  border: 1px solid grey;\n}\n\n.slider-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .slider-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: bold;\n  padding: 8px;\n  border-left: 1px solid grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGxhdGUtc3Bpbm5lci9wbGF0ZS1zcGlubmVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBRUEsaUJBQUE7QUFDSjs7QUFFRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFRTtFQUNFLFdBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUNBQUE7QUFDSjs7QUFFRTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFDRTtFQUNFLCtCQUFBO0VBQ0EsYUFBQTtBQUVKOztBQUFFO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBQUdKOztBQUFFO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7QUFHSiIsImZpbGUiOiJzcmMvYXBwL3BsYXRlLXNwaW5uZXIvcGxhdGUtc3Bpbm5lci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNzbGlkZXNob3cge1xyXG4gICAgbWFyZ2luOiA1MHB4O1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIHdpZHRoOiA2MDBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcclxuICAgIGN1cnNvcjogZ3JhYjtcclxuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcclxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgfVxyXG4gIFxyXG4gIC5zbGlkZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogOTBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvcmRlcjogNXB4IHNvbGlkICM4Yzc3Zjc7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDkzN2E2O1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICB9XHJcbiAgXHJcbiAgLnNsaWRlcntcclxuICAgIHdpZHRoOiAxMHB4O1xyXG4gICAgbWFyZ2luOiAxMHB4IGF1dG8gMTBweCBhdXRvO1xyXG4gICAgYmFja2dyb3VuZDogcmdiKDIwNCwgMjA0LCAyMDQpO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JleSAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgLnNsaWRlciAudWktc2xpZGVyLWhhbmRsZXtcclxuICAgIGJhY2tncm91bmQ6ICM0OTM3YTY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgfVxyXG4gIC5zbGlkZXIgLnVpLXNsaWRlci1oYW5kbGU6Zm9jdXN7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMHB4IDJweCAjOGM3N2Y3O1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICB9XHJcbiAgLnNsaWRlci10YWJsZSB7XHJcbiAgICBtYXJnaW46IDUwcHggMHB4IDUwcHggMHB4O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JleTtcclxuXHJcbiAgfVxyXG4gIC5zbGlkZXItdGFibGUgdGgsIC5zbGlkZXItdGFibGUgdGR7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgZ3JleTtcclxuICB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlateSpinnerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-plate-spinner',
                templateUrl: './plate-spinner.component.html',
                styleUrls: ['./plate-spinner.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/plate-spinner/plate-spinner.ts":
/*!************************************************!*\
  !*** ./src/app/plate-spinner/plate-spinner.ts ***!
  \************************************************/
/*! exports provided: Spinner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return Spinner; });
/* harmony import */ var _node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var _node_modules_jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__);

//Customizable
class Spinner {
    constructor(parentId, childClass, options) {
        var _a, _b, _c, _d, _e;
        this.oldMouseX = 0;
        this.newMouseX = 0;
        this.ellipseX = (_a = options === null || options === void 0 ? void 0 : options.ellipseX) !== null && _a !== void 0 ? _a : 400;
        this.ellipseY = (_b = options === null || options === void 0 ? void 0 : options.ellipseY) !== null && _b !== void 0 ? _b : 100;
        this.leftPad = (_c = options === null || options === void 0 ? void 0 : options.leftPad) !== null && _c !== void 0 ? _c : 0;
        this.topPad = (_d = options === null || options === void 0 ? void 0 : options.topPad) !== null && _d !== void 0 ? _d : 0;
        this.depth = (_e = options === null || options === void 0 ? void 0 : options.depth) !== null && _e !== void 0 ? _e : 0.5;
        this.parent = parentId;
        this.child = childClass;
        this.slides = Object(_node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__["$"])(this.parent).children(this.child);
        let parent = Object(_node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__["$"])(this.parent);
        parent.on("mousedown", (pointer) => {
            //moves slides in a negative or positive x direction based on position of the initial click
            var centerX = pointer.pageX;
            this.newMouseX = this.oldMouseX = pointer.pageX;
            //used for measuring mouse velocity
            this.mouseSpeed = window.setInterval(() => {
                this.oldMouseX = this.newMouseX;
            }, 50);
            parent.css("cursor", "grabbing");
            parent.on("mouseup", this, this.triggerEnd);
            parent.on("mouseleave", this, this.triggerEnd);
            parent.on("mousemove", (pointer) => {
                //update x position for velocity
                this.newMouseX = pointer.pageX;
                //calculate the change in x direction
                let delta = pointer.pageX - centerX;
                centerX = pointer.pageX;
                //apply transformations
                this.slides.each(num => {
                    let slide = Object(_node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__["$"])(this.slides[num]);
                    this.transform(slide, delta);
                });
            });
        });
        this.initSlides();
    }
    get ellipseX() {
        return this._ellipseX;
    }
    set ellipseX(value) {
        this._ellipseX = value > 0 ? value : 400;
    }
    get ellipseY() {
        return this._ellipseY;
    }
    set ellipseY(value) {
        this._ellipseY = value > 0 ? value : 100;
    }
    get depth() {
        return this._depth;
    }
    set depth(value) {
        this._depth = (value <= 1 || value >= 0) ? value : 0.5;
    }
    static linspace(start, stop, n) {
        var arr = Array(n);
        n--;
        for (var i = n; i >= 0; i--) {
            arr[i] = Math.round((i * stop + (n - i) * start) / n);
        }
        return arr;
    }
    initSlides() {
        //equal spacing between slides
        let slidePositions = Spinner.linspace(this.leftPad, this.ellipseX * 2 + this.leftPad, this.slides.length + 1);
        //initilatize positions
        this.slides.each(num => {
            let slide = Object(_node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__["$"])(this.slides[num]);
            let posX = slidePositions[num];
            let reverse = (this.depth < 0);
            slide.data("x", posX);
            slide.data("y", 0);
            slide.data("reverse", reverse);
            this.transform(slide, 0);
        });
    }
    //get the y coordinate of a slide given x based on an elliptical formula
    ellipse(x) {
        //normalize x from (-ellipseX, ellipseX)
        x = x / 0.5 - this.ellipseX;
        //calculate normalized y from (0, ellipseY)
        return this.ellipseY * Math.sqrt(1 - (Math.pow(x, 2) / Math.pow(this.ellipseX, 2)));
    }
    /*
    process for transformation:
    transformation of height occurs from top-down, width from left-right
    so center the origin of scale by shifting element in the opposite direction of its motion
    - shift x by delta
    - check boundary
    - calculate y
    - shift y
    - calculate scale
    - apply scale
    */
    transform(slide, delta) {
        //set boundaries for ellipse
        let max = this.ellipseX + this.leftPad;
        let min = this.leftPad;
        let data = slide.data();
        //if the slide's x position exceeds a boundary, reverse slide direction and compensate for excess
        data.reverse ? data.x -= delta : data.x += delta;
        if (data.x > max) {
            data.x = max - (data.x - max);
            data.reverse = !data.reverse;
        }
        else if (data.x < min) {
            data.x = min + (min - data.x);
            data.reverse = !data.reverse;
        }
        let y = this.ellipse(data.x - this.leftPad);
        y = data.reverse ? (-y) : y;
        //scale in range (minSize, maxSize), cannot divide by zero
        if (this.ellipseY === 0) {
            var relY1 = 0.5;
            var relY2 = 0.5;
        }
        else {
            var relY1 = -((y / this.ellipseY) / 2 - 0.5);
            var relY2 = (y / this.ellipseY) / 2 + 0.5;
        }
        //This scaling formula linearly effects slides by their y coordinate
        let scale = relY1 * (1 - this.depth) + relY2;
        //center the slide in parent container then apply delta y
        data.y = this.topPad + this.ellipseY + y;
        var z = Math.trunc(data.y) + 100;
        slide.css({
            "transform": "translate(" + data.x + "px, " + data.y + "px) scale(" + scale + ")",
            "z-index": z
        });
    }
    triggerEnd(pointer) {
        let scope = pointer.data;
        let parent = Object(_node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__["$"])(scope.parent);
        parent.css("cursor", "grab");
        parent.off("mousemove");
        parent.off("mouseleave");
        parent.off("mouseup");
        window.clearInterval(scope.mouseSpeed);
        var velocity = scope.newMouseX - scope.oldMouseX;
        if (velocity != 0) {
            scope.endingAnimation(velocity);
        }
    }
    endingAnimation(velocity) {
        var start;
        //5 is arbitrary
        var duration = Math.abs(5 * velocity);
        var delta = velocity / 5;
        var step = (timestamp) => {
            if (start === undefined) {
                start = timestamp;
            }
            let elapsed = Math.min((timestamp - start), duration);
            let time = elapsed / duration;
            //ease-out-quadratic formula
            let x = Math.pow((1 - time), 2);
            x *= delta;
            //floating points are unreliable and will cause jitter
            x = Math.round(x);
            this.slides.each(num => {
                let slide = Object(_node_modules_jquery__WEBPACK_IMPORTED_MODULE_0__["$"])(this.slides[num]);
                this.transform(slide, x);
            });
            if (elapsed < duration && x != 0) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}
//sliders
// $("#ellipseX").slider({
//   min: 100,
//   max: 700,
//   value: 400,
//   orientation: "vertical"
// }).height(200)
// $("#leftPad").slider({
//   min: -50,
//   max: 150,
//   value: 50,
//   orientation: "vertical"
// }).height(200)
// $("#ellipseY").slider({
//   min: 0,
//   max: 100,
//   value: 50,
//   orientation: "vertical"
// }).height(200)
// $("#topPad").slider({
//   min: -50,
//   max: 150,
//   value: 50,
//   orientation: "vertical"
// }).height(200)
// $("#depth").slider({
//   min: 0,
//   max: 1,
//   step: 0.1,
//   value: 0.5,
//   orientation: "vertical"
// }).height(200)
// $(".slider").each(function() {
//   $($(this).data("target")).text($(this).slider("value"))
//   $(this).on("slide", function(event, ui) {
//     $($(this).data("target")).text(ui.value)
//     window[$(this).prop("id")] = ui.value;
//     initSlides()
//   })
// })


/***/ }),

/***/ "./src/app/test/test.component.ts":
/*!****************************************!*\
  !*** ./src/app/test/test.component.ts ***!
  \****************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class TestComponent {
    constructor() {
        this.num = 99999;
        this.str = "99999";
    }
    ngOnInit() {
        console.log(this.id);
    }
}
TestComponent.ɵfac = function TestComponent_Factory(t) { return new (t || TestComponent)(); };
TestComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TestComponent, selectors: [["app-test"]], inputs: { id: "id" }, decls: 4, vars: 1, template: function TestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Hello");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.id);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlc3QvdGVzdC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TestComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-test',
                templateUrl: './test.component.html',
                styleUrls: ['./test.component.scss']
            }]
    }], function () { return []; }, { id: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/usersplot/usersplot.component.ts":
/*!**************************************************!*\
  !*** ./src/app/usersplot/usersplot.component.ts ***!
  \**************************************************/
/*! exports provided: UsersPlotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersPlotComponent", function() { return UsersPlotComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_hierarchy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-hierarchy */ "./node_modules/d3-hierarchy/src/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");







class UsersPlotComponent {
    constructor() {
        this.margin = { top: 5, right: 5, bottom: 5, left: 5 };
        this.padding = 4;
        this.NullUser = {
            login: "---",
            html_url: "#user-display",
            avatar_url: "https://pluspng.com/img-png/github-octocat-logo-vector-png-png-ico-icns-svg-more-512.png",
            issueCount: 0,
            pullCount: 0,
            assignedCount: 0,
        };
        this.User = this.NullUser;
    }
    get avatar_url() {
        return this.User.avatar_url;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.DrawPlot();
    }
    Refresh(users) {
        this.users = users;
        this.User = this.NullUser;
        this.DrawPlot();
    }
    DrawPlot() {
        var component = this;
        var users = this.users;
        var margin = this.margin;
        var svg = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])('#users');
        var width = +svg.attr('width') - margin.left - margin.right;
        var height = +svg.attr('height') - margin.top - margin.bottom;
        var background = svg.append("rect")
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', svg.attr('width'))
            .attr('height', svg.attr('height'))
            .attr('fill', 'black');
        var g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        var maximum = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(Object.values(users), (d) => d.issueCount + d.pullCount + d.assignedCount);
        var myColor = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleSequential"])(Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_5__["interpolate"])("#b4b2f7", "#5f00b8")).domain([1, maximum]);
        var data = { name: "TopNode", children: Object.values(users) };
        var root = Object(d3_hierarchy__WEBPACK_IMPORTED_MODULE_2__["hierarchy"])(data).sum((d) => (d.issueCount + d.pullCount + d.assignedCount));
        Object(d3_hierarchy__WEBPACK_IMPORTED_MODULE_2__["treemap"])().size([width, height]).padding(this.padding)(root);
        var boxes = g.selectAll(".box")
            .data(root.leaves())
            .enter();
        boxes.append("rect")
            .attr('x', (d) => d.x0)
            .attr('y', (d) => d.y0)
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            .attr("fill", (d) => myColor(d.value))
            .on("mouseover", function (event) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this)
                .attr('stroke', 'white')
                .attr('stroke-width', '2px');
        })
            .on("mouseout", function (event) {
            var box = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            box.attr('stroke-width', '0px');
        })
            .on("click", function (event) {
            var box = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            component.User = box.data()[0].data;
        })
            .attr('opacity', 0)
            .transition()
            .duration(() => Math.random() * 700 + 500)
            .attr('opacity', 1);
    }
}
UsersPlotComponent.ɵfac = function UsersPlotComponent_Factory(t) { return new (t || UsersPlotComponent)(); };
UsersPlotComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UsersPlotComponent, selectors: [["app-usersplot"]], inputs: { users: "users" }, decls: 22, vars: 6, consts: [[1, "row", "justify-content-center", "p-0", "m-0", "bg-light"], [1, "col-auto", "p-0"], ["width", "550", "height", "400", "id", "users"], ["id", "user-display", 1, "col-auto"], ["target", "_blank", 3, "href"], ["height", "100px", "width", "auto", "alt", "avatar", "id", "avatar", 3, "src"], [1, "list-unstyled"]], template: function UsersPlotComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "svg", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Pulls: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Issues: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Assigned: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", ctx.User.html_url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.avatar_url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.User.login);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.User.pullCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.User.issueCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.User.assignedCount);
    } }, styles: ["#user-display[_ngcontent-%COMP%] {\n  height: 400px;\n  min-width: 200px;\n  padding: 16px 8px 8px 8px;\n  text-align: center;\n  border-top: 5px solid black;\n  border-bottom: 5px solid black;\n  border-right: 5px solid black;\n}\n\n#user-display[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  object-fit: cover;\n  border-radius: 50%;\n}\n\n#user-display[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], li[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n@media (max-width: 800px) {\n  #user-display[_ngcontent-%COMP%] {\n    padding: 8px;\n    border-top: 0px;\n    border-left: 5px solid black;\n    border-bottom: 5px solid black;\n    border-right: 5px solid black;\n    height: 150px;\n    min-width: 550px;\n  }\n\n  #user-display[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n    display: inline-block;\n    right: 0;\n    position: relative;\n  }\n\n  #user-display[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], img[_ngcontent-%COMP%] {\n    display: inline-block;\n    left: 0;\n    position: relative;\n    margin-right: 8px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlcnNwbG90L3VzZXJzcGxvdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQkFBQTtFQUNBLDhCQUFBO0VBQ0EsNkJBQUE7QUFDSjs7QUFDQTtFQUNJLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUVKOztBQUFBO0VBQ0ksZUFBQTtBQUdKOztBQUFBO0VBQ0k7SUFDSSxZQUFBO0lBQ0EsZUFBQTtJQUNBLDRCQUFBO0lBQ0EsOEJBQUE7SUFDQSw2QkFBQTtJQUNBLGFBQUE7SUFDQSxnQkFBQTtFQUdOOztFQURFO0lBQ0kscUJBQUE7SUFDQSxRQUFBO0lBQ0Esa0JBQUE7RUFJTjs7RUFGRTtJQUNJLHFCQUFBO0lBQ0EsT0FBQTtJQUNBLGtCQUFBO0lBQ0EsaUJBQUE7RUFLTjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvdXNlcnNwbG90L3VzZXJzcGxvdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiN1c2VyLWRpc3BsYXl7XHJcbiAgICBoZWlnaHQ6IDQwMHB4O1xyXG4gICAgbWluLXdpZHRoOiAyMDBweDtcclxuICAgIHBhZGRpbmc6IDE2cHggOHB4IDhweCA4cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgYmxhY2s7XHJcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgYmxhY2s7XHJcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBibGFjaztcclxufVxyXG4jdXNlci1kaXNwbGF5IGltZ3tcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG4jdXNlci1kaXNwbGF5IHNwYW4sIGxpe1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOiA4MDBweCl7XHJcbiAgICAjdXNlci1kaXNwbGF5e1xyXG4gICAgICAgIHBhZGRpbmc6IDhweDtcclxuICAgICAgICBib3JkZXItdG9wOiAwcHg7XHJcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCBibGFjaztcclxuICAgICAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgYmxhY2s7XHJcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgYmxhY2s7XHJcbiAgICAgICAgaGVpZ2h0OiAxNTBweDtcclxuICAgICAgICBtaW4td2lkdGg6IDU1MHB4O1xyXG4gICAgfVxyXG4gICAgI3VzZXItZGlzcGxheSB1bHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgfVxyXG4gICAgI3VzZXItZGlzcGxheSBoMywgaHIsIGltZ3tcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgICB9XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UsersPlotComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-usersplot',
                templateUrl: './usersplot.component.html',
                styleUrls: ['./usersplot.component.scss']
            }]
    }], function () { return []; }, { users: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    githubapi: "https://api.github.com/",
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\bugbe\Documents\VSCode\mysite\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map