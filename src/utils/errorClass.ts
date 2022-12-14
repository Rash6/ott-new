export default class CustumError extends Error {
    public errorType: string;
    constructor( errorType: string,message: string) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
      this.errorType = errorType;
      Error.captureStackTrace(this);
    }
  }