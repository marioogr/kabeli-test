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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var class_transformer_1 = require("class-transformer");
var bcrypt = require("bcrypt");
var user_status_enum_1 = require("@common/enums/user-status.enum");
var sign_in_response_dto_1 = require("./dto/sign-in-response.dto");
var token_type_enum_1 = require("@common/enums/token-type.enum");
var AuthService = /** @class */ (function () {
    function AuthService(i18n, userService, jwtService, configService, mailjetService) {
        this.i18n = i18n;
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailjetService = mailjetService;
    }
    AuthService.prototype.signIn = function (signInRequestDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b, _c, passwordsMatch, _d, accessToken, returnValue;
            var _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne({
                            email: signInRequestDto.email
                        }, ['+password', '+isMaster'], undefined, true)];
                    case 1:
                        user = _j.sent();
                        if (!!user) return [3 /*break*/, 3];
                        _a = common_1.UnauthorizedException.bind;
                        _e = {};
                        return [4 /*yield*/, this.i18n.translate('auth.userOrPasswordInvalid')];
                    case 2: throw new (_a.apply(common_1.UnauthorizedException, [void 0, (_e.message = _j.sent(),
                            _e)]))();
                    case 3:
                        if (!(user.status === user_status_enum_1.UserStatusEnum.pendingEmail)) return [3 /*break*/, 5];
                        _b = common_1.BadRequestException.bind;
                        _f = {};
                        return [4 /*yield*/, this.i18n.translate('auth.userNoVerify')];
                    case 4: throw new (_b.apply(common_1.BadRequestException, [void 0, (_f.message = _j.sent(),
                            _f)]))();
                    case 5:
                        if (!(user.status === user_status_enum_1.UserStatusEnum.inactive)) return [3 /*break*/, 7];
                        _c = common_1.UnauthorizedException.bind;
                        _g = {};
                        return [4 /*yield*/, this.i18n.translate('auth.inactiveUser')];
                    case 6: throw new (_c.apply(common_1.UnauthorizedException, [void 0, (_g.message = _j.sent(),
                            _g)]))();
                    case 7: return [4 /*yield*/, this.validateCredentials(user.password, signInRequestDto.password)];
                    case 8:
                        passwordsMatch = _j.sent();
                        if (!!passwordsMatch) return [3 /*break*/, 10];
                        _d = common_1.UnauthorizedException.bind;
                        _h = {};
                        return [4 /*yield*/, this.i18n.translate('auth.userOrPasswordInvalid')];
                    case 9: throw new (_d.apply(common_1.UnauthorizedException, [void 0, (_h.message = _j.sent(),
                            _h)]))();
                    case 10:
                        accessToken = this.createAccessTokenFromUser(user);
                        returnValue = {
                            accessToken: accessToken,
                            user: user
                        };
                        return [2 /*return*/, (0, class_transformer_1.plainToClass)(sign_in_response_dto_1.SignInResponseDto, returnValue, {
                                excludeExtraneousValues: true
                            })];
                }
            });
        });
    };
    /**
     * Sign up a user
     * @param {SignUpRequestDto} signUpRequestDto - The DTO describing the user who wants to sign up
     * @return {Promise<SignInReturnValue>} A promise resolving in the sign up return value
     */
    AuthService.prototype.signUp = function (signUpRequestDto) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, _a, user, _b, _c, _d, accessToken;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne({
                            email: signUpRequestDto.email.toLowerCase()
                        })];
                    case 1:
                        findUser = _g.sent();
                        if (!findUser) return [3 /*break*/, 3];
                        _a = common_1.BadRequestException.bind;
                        _e = {};
                        return [4 /*yield*/, this.i18n.translate('auth.alreadyExistsUser', {
                                args: { email: signUpRequestDto.email.toLowerCase() }
                            })];
                    case 2: throw new (_a.apply(common_1.BadRequestException, [void 0, (_e.message = _g.sent(),
                            _e)]))();
                    case 3:
                        _c = (_b = this.userService).create;
                        _d = [__assign({}, signUpRequestDto)];
                        _f = {};
                        return [4 /*yield*/, bcrypt.hash(signUpRequestDto.password, 10)];
                    case 4: return [4 /*yield*/, _c.apply(_b, [__assign.apply(void 0, _d.concat([(_f.password = _g.sent(), _f.status = user_status_enum_1.UserStatusEnum.pendingEmail, _f)]))])];
                    case 5:
                        user = _g.sent();
                        accessToken = this.createAccessTokenFromUser(user, token_type_enum_1.TokenTypeEnum.email, '24h');
                        // Send mail
                        this.mailjetService.userVerificationEmail(user, accessToken);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.validateCredentials = function (dbPassword, dtoPassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.compare(dtoPassword, dbPassword)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.createAccessTokenFromUser = function (user, tokenType, duration) {
        if (tokenType === void 0) { tokenType = token_type_enum_1.TokenTypeEnum.client; }
        if (duration === void 0) { duration = '1y'; }
        var payload = {
            uid: user._id,
            type: user.isMaster ? token_type_enum_1.TokenTypeEnum.system : tokenType,
            sub: user.email,
            acc: user.accounts
        };
        return this.jwtService.sign(payload, { expiresIn: duration });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
