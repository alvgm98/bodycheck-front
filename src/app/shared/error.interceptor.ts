import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { catchError, retry, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError(error => {
      if (error.status == 0) {
        errorService.errorMessage.set('Ha ocurrido un error. No hay conexion con el servidor!')
      } else {
        errorService.errorMessage.set('Ha ocurrido un error desconocido.')
      }
      return throwError(() => error);
    }),
    retry(req.method == 'GET' ? 3 : 0),
  );
};

