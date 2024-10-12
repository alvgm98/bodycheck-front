import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { MessageService } from './message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError(error => {
      if (error.status == 0) {
        messageService.emitError('Ha ocurrido un error. No hay conexion con el servidor!');
      } else {
        messageService.emitError(error.error.message ? error.error.message : 'Ha ocurrido un error desconocido.');
      }
      return throwError(() => error);
    }),
    retry(req.method == 'GET' ? 3 : 0),
  );
};

