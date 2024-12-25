import {Response} from 'express'

export function sendSuccess(res: Response, data: any, message: string = 'Request successful', status: number = 200) {
    return res.status(status).json({
      message,
      data,
    });
  }
  
  export function sendError(res: Response, message: string, status: number = 500) {
    return res.status(status).json({
      message,
    });
  }
  