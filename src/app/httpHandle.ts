import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { retry, catchError } from 'rxjs/operators';
  
  export class SiteHttp implements HttpInterceptor {
     token=localStorage.getItem('token');
    

  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer `+ localStorage.getItem('token')
            }
        });

      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = error.error.message;
             /*if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            } */

            if(errorMessage=='Unauthenticated.'){
                //localStorage.clear();
               // window.location.href='/';
             }
           /*  window.alert(errorMessage); */
            return throwError(errorMessage);
          })
        )
    }
  }