import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'localizedDate',
    pure: false
})
export class LocalizedDatePipe implements PipeTransform {

    constructor(private translateService: TranslateService) { }

    transform(value: any): any {
        const date = new Date(value);

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        return date.toLocaleString(this.translateService.getBrowserLang(), options);
    }

}
