import { Request } from '../lib/request';
import { Cache } from '../lib/cache';
import { Config } from '../types';
export default class {
    httpRequest: Request;
    cache: Cache;
    accessTokenKey: string;
    accessTokenExpireKey: string;
    refreshTokenKey: string;
    constructor(config: Config);
    setRefreshToken(refreshToken: any): void;
    getJwt(appid?: string, loginType?: string, code?: string): any;
}
