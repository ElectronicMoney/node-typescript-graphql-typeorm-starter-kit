import {User} from '../entity/User';
import {sign} from 'jsonwebtoken';

export class Auth { 
    //field 
    accessToken:string; 
    refreshToken:string; 
  
    //constructor 
    constructor() { 
       this.accessToken  = process.env.ACCESS_TOKEN_SECRETE!;
       this.refreshToken = process.env.REFRESH_TOKEN_SECRETE!;
    }  
 
    //createAccessToken 
    createAccessToken(user:User) {
        return sign({userId: user.id}, this.accessToken, {expiresIn: '7d'});

    }

    //createRefreshToken 
    createRefreshToken(user: User) {
        return sign({userId: user.id}, this.refreshToken, {expiresIn: '7d'});
    }
}