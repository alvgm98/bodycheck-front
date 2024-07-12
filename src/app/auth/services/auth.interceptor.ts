import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Las consultas de login y register no necesitan token en la cabecera
  if (req.url.startsWith(environment.apiAuthUrl)) {
    return next(req);
  }

  const cookieService = inject(CookieService);
  const token = cookieService.get(environment.TOKEN_KEY);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  } else {
    return next(req);
  }
};
