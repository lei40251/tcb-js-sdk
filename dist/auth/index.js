"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var weixinAuthProvider_1 = require("./weixinAuthProvider");
var anonymousAuthProvider_1 = require("./anonymousAuthProvider");
var base_1 = require("./base");
var cache_1 = require("../lib/cache");
var request_1 = require("../lib/request");
var events_1 = require("../lib/events");
var customAuthProvider_1 = require("./customAuthProvider");
var emailAuthProvider_1 = require("./emailAuthProvider");
var usernameAuthProvider_1 = require("./usernameAuthProvider");
var Auth = (function () {
    function Auth(config) {
        this.config = config;
        this._cache = cache_1.getCache(config.env);
        this._request = request_1.getRequestByEnvId(config.env);
        this._onAnonymousConverted = this._onAnonymousConverted.bind(this);
        this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this);
        events_1.addEventListener(events_1.EVENTS.LOGIN_TYPE_CHANGED, this._onLoginTypeChanged);
    }
    Object.defineProperty(Auth.prototype, "currentUser", {
        get: function () {
            var loginState = this.hasLoginState();
            if (loginState) {
                return loginState.user || null;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Auth.prototype, "loginType", {
        get: function () {
            return this._cache.getStore(this._cache.keys.loginTypeKey);
        },
        enumerable: true,
        configurable: true
    });
    Auth.prototype.weixinAuthProvider = function (_a) {
        var appid = _a.appid, scope = _a.scope, state = _a.state;
        return new weixinAuthProvider_1.WeixinAuthProvider(this.config, appid, scope, state);
    };
    Auth.prototype.anonymousAuthProvider = function () {
        return new anonymousAuthProvider_1.AnonymousAuthProvider(this.config);
    };
    Auth.prototype.customAuthProvider = function () {
        return new customAuthProvider_1.CustomAuthProvider(this.config);
    };
    Auth.prototype.emailAuthProvider = function () {
        return new emailAuthProvider_1.EmailAuthProvider(this.config);
    };
    Auth.prototype.usernameAuthProvider = function () {
        return new usernameAuthProvider_1.UsernameAuthProvider(this.config);
    };
    Auth.prototype.signInAnonymously = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new anonymousAuthProvider_1.AnonymousAuthProvider(this.config).signIn()];
            });
        });
    };
    Auth.prototype.signInWithEmailAndPassword = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new emailAuthProvider_1.EmailAuthProvider(this.config).signIn(email, password)];
            });
        });
    };
    Auth.prototype.signInWithUsernameAndPassword = function (username, password) {
        return new usernameAuthProvider_1.UsernameAuthProvider(this.config).signIn(username, password);
    };
    Auth.prototype.linkAndRetrieveDataWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._anonymousAuthProvider) {
                            this._anonymousAuthProvider = new anonymousAuthProvider_1.AnonymousAuthProvider(this.config);
                        }
                        events_1.addEventListener(events_1.EVENTS.ANONYMOUS_CONVERTED, this._onAnonymousConverted);
                        return [4, this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(ticket)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    Auth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, refreshTokenKey, accessTokenKey, accessTokenExpireKey, action, refresh_token, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.loginType === base_1.LOGINTYPE.ANONYMOUS) {
                            throw new Error('[tcb-js-sdk] 匿名用户不支持登出操作');
                        }
                        _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        action = 'auth.logout';
                        refresh_token = this._cache.getStore(refreshTokenKey);
                        if (!refresh_token) {
                            return [2];
                        }
                        return [4, this._request.send(action, { refresh_token: refresh_token })];
                    case 1:
                        res = _b.sent();
                        this._cache.removeStore(refreshTokenKey);
                        this._cache.removeStore(accessTokenKey);
                        this._cache.removeStore(accessTokenExpireKey);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_CHANGED);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this.config.env,
                            loginType: base_1.LOGINTYPE.NULL,
                            persistence: this.config.persistence
                        });
                        return [2, res];
                }
            });
        });
    };
    Auth.prototype.signUpWithEmailAndPassword = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.signUpWithEmailAndPassword', {
                        email: email, password: password
                    })];
            });
        });
    };
    Auth.prototype.sendPasswordResetEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._request.send('auth.sendPasswordResetEmail', {
                        email: email
                    })];
            });
        });
    };
    Auth.prototype.onLoginStateChanged = function (callback) {
        var _this = this;
        events_1.addEventListener(events_1.EVENTS.LOGIN_STATE_CHANGED, function () {
            var loginState = _this.hasLoginState();
            callback.call(_this, loginState);
        });
        var loginState = this.hasLoginState();
        callback.call(this, loginState);
    };
    Auth.prototype.onLoginStateExpired = function (callback) {
        events_1.addEventListener(events_1.EVENTS.LOGIN_STATE_EXPIRED, callback.bind(this));
    };
    Auth.prototype.onAccessTokenRefreshed = function (callback) {
        events_1.addEventListener(events_1.EVENTS.ACCESS_TOKEN_REFRESHD, callback.bind(this));
    };
    Auth.prototype.onAnonymousConverted = function (callback) {
        events_1.addEventListener(events_1.EVENTS.ANONYMOUS_CONVERTED, callback.bind(this));
    };
    Auth.prototype.onLoginTypeChanged = function (callback) {
        var _this = this;
        events_1.addEventListener(events_1.EVENTS.LOGIN_TYPE_CHANGED, function () {
            var loginState = _this.hasLoginState();
            callback.call(_this, loginState);
        });
    };
    Auth.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4, this._request.getAccessToken()];
                    case 1: return [2, (_a.accessToken = (_b.sent()).accessToken,
                            _a.env = this.config.env,
                            _a)];
                }
            });
        });
    };
    Auth.prototype.hasLoginState = function () {
        var refreshTokenKey = this._cache.keys.refreshTokenKey;
        var refreshToken = this._cache.getStore(refreshTokenKey);
        if (refreshToken) {
            return new LoginState(this.config.env);
        }
        else {
            return null;
        }
    };
    Auth.prototype.isUsernameRegistered = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof username !== 'string') {
                            throw new Error('username must be a string');
                        }
                        return [4, this._request.send('auth.isUsernameRegistered', {
                                username: username
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2, data && data.isRegistered];
                }
            });
        });
    };
    Auth.prototype.getLoginState = function () {
        return Promise.resolve(this.hasLoginState());
    };
    Auth.prototype.signInWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new customAuthProvider_1.CustomAuthProvider(this.config).signIn(ticket)];
            });
        });
    };
    Auth.prototype.shouldRefreshAccessToken = function (hook) {
        this._request._shouldRefreshAccessTokenHook = hook.bind(this);
    };
    Auth.prototype.getUserInfo = function () {
        var action = 'auth.getUserInfo';
        console.warn('Auth.getUserInfo() 将会在下个主版本下线，请使用 Auth.currentUser 来获取用户信息');
        return this._request.send(action, {}).then(function (res) {
            if (res.code) {
                return res;
            }
            else {
                return __assign(__assign({}, res.data), { requestId: res.seqId });
            }
        });
    };
    Auth.prototype.getAuthHeader = function () {
        var _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey;
        var refreshToken = this._cache.getStore(refreshTokenKey);
        var accessToken = this._cache.getStore(accessTokenKey);
        return {
            'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
        };
    };
    Auth.prototype._onAnonymousConverted = function (ev) {
        var env = ev.data.env;
        if (env !== this.config.env) {
            return;
        }
        this._cache.updatePersistence(this.config.persistence);
    };
    Auth.prototype._onLoginTypeChanged = function (ev) {
        var _a = ev.data, loginType = _a.loginType, persistence = _a.persistence, env = _a.env;
        if (env !== this.config.env) {
            return;
        }
        this._cache.updatePersistence(persistence);
        this._cache.setStore(this._cache.keys.loginTypeKey, loginType);
    };
    return Auth;
}());
exports.Auth = Auth;
var User = (function () {
    function User(envId) {
        if (!envId) {
            throw new Error('envId is not defined');
        }
        this._envId = envId;
        this._cache = cache_1.getCache(this._envId);
        this._request = request_1.getRequestByEnvId(this._envId);
        this.setUserInfo();
    }
    User.prototype.linkWithTicket = function (ticket) {
        if (typeof ticket !== 'string') {
            throw new Error('ticket must be string');
        }
        return this._request.send('auth.linkWithTicket', { ticket: ticket });
    };
    User.prototype.linkWithRedirect = function (provider) {
        provider.signInWithRedirect();
    };
    User.prototype.updatePassword = function (newPassword, oldPassword) {
        return this._request.send('auth.updatePassword', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    };
    User.prototype.updateEmail = function (newEmail) {
        return this._request.send('auth.updateEmail', {
            newEmail: newEmail
        });
    };
    User.prototype.updateUsername = function (username) {
        if (typeof username !== 'string') {
            throw new Error('username must be a string');
        }
        return this._request.send('auth.updateUsername', {
            username: username
        });
    };
    User.prototype.getLinkedUidList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, hasPrimaryUid, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._request.send('auth.getLinkedUidList', {})];
                    case 1:
                        data = (_a.sent()).data;
                        hasPrimaryUid = false;
                        users = data.users;
                        users.forEach(function (user) {
                            if (user.wxOpenId && user.wxPublicId) {
                                hasPrimaryUid = true;
                            }
                        });
                        return [2, {
                                users: users,
                                hasPrimaryUid: hasPrimaryUid
                            }];
                }
            });
        });
    };
    User.prototype.setPrimaryUid = function (uid) {
        return this._request.send('auth.setPrimaryUid', { uid: uid });
    };
    User.prototype.unlink = function (platform) {
        return this._request.send('auth.unlink', { platform: platform });
    };
    User.prototype.update = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var nickName, gender, avatarUrl, province, country, city, newUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nickName = userInfo.nickName, gender = userInfo.gender, avatarUrl = userInfo.avatarUrl, province = userInfo.province, country = userInfo.country, city = userInfo.city;
                        return [4, this._request.send('auth.updateUserInfo', { nickName: nickName, gender: gender, avatarUrl: avatarUrl, province: province, country: country, city: city })];
                    case 1:
                        newUserInfo = (_a.sent()).data;
                        this.setLocalUserInfo(newUserInfo);
                        return [2];
                }
            });
        });
    };
    User.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var action, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        action = 'auth.getUserInfo';
                        return [4, this._request.send(action, {})];
                    case 1:
                        userInfo = (_a.sent()).data;
                        this.setLocalUserInfo(userInfo);
                        return [2, userInfo];
                }
            });
        });
    };
    User.prototype.setUserInfo = function () {
        var _this = this;
        var userInfoKey = this._cache.keys.userInfoKey;
        var userInfo = this._cache.getStore(userInfoKey);
        [
            'uid',
            'loginType',
            'openid',
            'wxOpenId',
            'wxPublicId',
            'unionId',
            'qqMiniOpenId',
            'email',
            'hasPassword',
            'customUserId',
            'nickName',
            'gender',
            'avatarUrl',
        ].forEach(function (infoKey) {
            _this[infoKey] = userInfo[infoKey];
        });
        this.location = {
            country: userInfo['country'],
            province: userInfo['province'],
            city: userInfo['city']
        };
    };
    User.prototype.setLocalUserInfo = function (userInfo) {
        var userInfoKey = this._cache.keys.userInfoKey;
        this._cache.setStore(userInfoKey, userInfo);
        this.setUserInfo();
    };
    return User;
}());
exports.User = User;
var LoginState = (function () {
    function LoginState(envId) {
        if (!envId) {
            throw new Error('envId is not defined');
        }
        this._cache = cache_1.getCache(envId);
        var _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
        var refreshToken = this._cache.getStore(refreshTokenKey);
        var accessToken = this._cache.getStore(accessTokenKey);
        var accessTokenExpire = this._cache.getStore(accessTokenExpireKey);
        this.credential = {
            refreshToken: refreshToken,
            accessToken: accessToken,
            accessTokenExpire: accessTokenExpire
        };
        this.user = new User(envId);
    }
    Object.defineProperty(LoginState.prototype, "isAnonymousAuth", {
        get: function () {
            return this.loginType === base_1.LOGINTYPE.ANONYMOUS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isCustomAuth", {
        get: function () {
            return this.loginType === base_1.LOGINTYPE.CUSTOM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "isWeixinAuth", {
        get: function () {
            return this.loginType === base_1.LOGINTYPE.WECHAT || this.loginType === base_1.LOGINTYPE.WECHAT_OPEN || this.loginType === base_1.LOGINTYPE.WECHAT_PUBLIC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginState.prototype, "loginType", {
        get: function () {
            return this._cache.getStore(this._cache.keys.loginTypeKey);
        },
        enumerable: true,
        configurable: true
    });
    return LoginState;
}());
exports.LoginState = LoginState;
