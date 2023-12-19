import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Directive, OnDestroy, inject } from "@angular/core";
import { Subject } from "rxjs";
@Directive({})
export class BaseComponent implements OnDestroy {
    protected _translateService=inject(TranslateService);
    protected _cdr=inject(ChangeDetectorRef);

    destroyed$=new Subject<void>();

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}