import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { urls } from '../Urls/urlList';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let token = localStorage.getItem('token');

  console.log('inside the interceptor');

  for (const e of urls) {
    console.log('inside the for loop');
    console.log(req.url.includes(e) + req.url);
    if (req.url.includes(e) && req.method != 'GET') {
      return next(req);
    } else {
      console.log('inside for wala else');
    }
  }

  if (token) {
    console.log('inside the if token condition');
    let modifiedReq = req.clone({
      headers: req.headers.set('X-Auth-Token', token),
    });
    return next(modifiedReq);
  } else {
    router.navigate(['/']);
    throw new Error('unauthorized access');
  }
};
