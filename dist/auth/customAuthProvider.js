"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var events_1 = require("../lib/events");
var index_1 = require("./index");
var CustomAuthProvider = (function (_super) {
    __extends(CustomAuthProvider, _super);
    function CustomAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAuthProvider.prototype.signIn = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenKey, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof ticket !== 'string') {
                            throw new Error('ticket must be a string');
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._request.send('auth.signInWithTicket', {
                                ticket: ticket,
                                refresh_token: this._cache.getStore(refreshTokenKey) || ''
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.refresh_token) return [3, 4];
                        this.setRefreshToken(res.refresh_token);
                        return [4, this._request.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_CHANGED);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this.config.env,
                            loginType: base_1.LOGINTYPE.CUSTOM,
                            persistence: this.config.persistence
                        });
                        return [4, this.refreshUserInfo()];
                    case 3:
                        _a.sent();
                        return [2, new index_1.LoginState(this.config.env)];
                    case 4: throw new Error('[tcb-js-sdk] 自定义登录失败');
                }
            });
        });
    };
    return CustomAuthProvider;
}(base_1.AuthProvider));
exports.CustomAuthProvider = CustomAuthProvider;
