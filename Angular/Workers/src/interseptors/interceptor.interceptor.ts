import { HttpInterceptorFn } from '@angular/common/http';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
console.log("inter");

  if (token) {
    console.log("inter2");
    
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
console.log("inter3");

  return next(req);
};

