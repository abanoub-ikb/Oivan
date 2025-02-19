interface IAuthBase<T> {
    data: {
      type: 'auth';
      attributes: T;
    };
  }
  
  export interface IUser {
    username: string;
    password: string;
  }
  
  export interface ILoginReq extends IAuthBase<IUser> {}
  
  export interface ILoginRes extends IAuthBase<{ token: string }> {}