import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.indexOf("auth") > 0) return next(req);

  const myToken = localStorage.getItem('Angular17Token')
  const CloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`
    }
  })
  return next(CloneRequest);
};