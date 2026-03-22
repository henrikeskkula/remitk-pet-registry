import { HttpInterceptorFn } from '@angular/common/http';

function getAuthHeaderValue(): string | null {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authHeader = getAuthHeaderValue();

  if (!authHeader) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: authHeader
    }
  });

  return next(authReq);
};