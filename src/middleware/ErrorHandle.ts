import { NextFunction, Request, Response } from "express";
import CustumError from "../utils/errorClass";
export const errorHandler = async (
  Error: CustumError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (Error.errorType) {
    case "validation_error": {
      res.status(401).json({
        message: Error.message,
      });
    break
    }
    case "data_not_found": {
      res.status(404).json({
        message: Error.message,
      });
      break
    }
    case "not_found":{
      res.status(404).json({
        message:Error.message
      });
      break
    }
    case "authentication":{
      res.status(401).json({
        message:Error.message
      });
      break
    }
    case "user_id should be unique":{
      res.status(401).json({
        message:Error.message
      });
      break
    }
    case "invalid_req":{
      res.status(401).json({
        message:Error.message
      })
      break
    }
    default :{
      res.status(500).json(
        "internal server error"
      )
    }
  }
};