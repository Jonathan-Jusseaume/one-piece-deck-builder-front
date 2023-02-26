import {Injectable, OnDestroy} from '@angular/core';
import {catchError, Observable, retry, Subscription, throwError} from "rxjs";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor, OnDestroy {

    private subscriptions: Subscription[] = [];

    private isAlreadyDisplayingMessage: boolean = false;

    constructor(private _translateService: TranslateService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(retry(1), catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    this.showErrorMessage('ClientError');
                } else {

                    if (error.status === 0) {
                        this.showErrorMessage('BackUnavailable');
                    } else {
                        this.showErrorMessage(error.error.error.message);
                    }
                }
                return throwError(error.error);
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(subscription => subscription?.unsubscribe());
    }

    showErrorMessage(text): void {
        if (!this.isAlreadyDisplayingMessage) {
            this.isAlreadyDisplayingMessage = true;
            this.subscriptions.push(
                this._translateService.get([text]).subscribe(result => {
                    $.notify({
                        icon: "pe-7s-attention",
                        message: result[text]
                    }, {
                        type: 'danger',
                        timer: 100,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                }));
        }
    }


}
