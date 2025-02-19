import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Shared/services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('/auth')){
    return next(req)
  };
  const authService = inject(AuthService);
  const token = authService.getTokenFromStorage();
  if(token){
    const modefiedReq = req.clone({
      setHeaders:{
        authentication:token,
        "Content-Type":'application/vnd.api+json'
      }
    });
    return next(modefiedReq);
  }
  return next(req);
};
