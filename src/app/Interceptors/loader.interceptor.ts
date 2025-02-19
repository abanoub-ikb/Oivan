import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../Shared/services/loaderService/loader.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { ErrorService } from '../Shared/services/errorService/error.service';
import { ToastService } from '../Shared/services/successToastService/toast.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const errorService = inject(ErrorService);
  const toastService = inject(ToastService);
  loaderService.load(true)
  return next(req).pipe(
    tap(()=> toastService.showToast()),
    catchError(error => {
      loaderService.load(false);
      const errorDetail = error?.error?.errors?.[0]?.detail || 'An unexpected error occurred';
      errorService.setError(errorDetail);
      return throwError(() => error);
    }),
    finalize(() => loaderService.load(false))
  );
};
