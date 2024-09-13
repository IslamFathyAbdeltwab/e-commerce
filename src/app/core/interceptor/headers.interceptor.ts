import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

if(req.url.includes("cart")){
  req=req.clone({
    setHeaders:{token:localStorage.getItem("userToken") !}
  })
}
  return next(req);
};
