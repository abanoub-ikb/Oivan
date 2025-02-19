import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../Shared/services/loaderService/loader.service';
import { catchError, finalize, throwError } from 'rxjs';
import { ErrorService } from '../Shared/services/errorService/error.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const errorService = inject(ErrorService);
  loaderService.load(true)
  errorService.clearError();
  return next(req).pipe(
    catchError(error => {
      loaderService.load(false);
      const errorDetail = error?.error?.errors?.[0]?.detail || 'An unexpected error occurred';
      errorService.setError(errorDetail);
      return throwError(() => error);
    }),
    finalize(() => {
      loaderService.load(false);
    })
  );
};
