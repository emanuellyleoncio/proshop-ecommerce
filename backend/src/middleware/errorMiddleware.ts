import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;

    if(error.message && error.stack) {
        console.log(error.stack);
        statusCode = 400;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
};

export { notFound, errorHandler };