import { NextFunction, Request, Response } from 'express'

export interface IExpressMiddlewareSignature {
    req: Request;
    res: Response;
    next: NextFunction;
}
