import { IRequestBody } from "./api-request.model";

  
  export interface IUser {
    username: string;
    password: string;
  }
  
  export interface ILoginReq extends IRequestBody<IUser> {}
  
  export interface ILoginRes extends IRequestBody<{ token: string }> {}