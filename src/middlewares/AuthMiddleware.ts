import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../AppContext";

export const AuthMiddleware: MiddlewareFn<AppContext> = ({ context }, next) => {
    // Get the authorization from the context
    const authorization = context.req.headers['authorization'];

    // Check if there is authorization passed
    if (!authorization) {
        throw new Error("You are not Authorised to Access this resource 1!");
    }

    try {
        const token = (<string>authorization).split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRETE!);
        // store the payload on the app context
        context.payload = payload as any;

    } catch (error) {
        console.log(error);
        throw new Error("You are not Authorised to Access this resource!");
    }

    return  next();
};