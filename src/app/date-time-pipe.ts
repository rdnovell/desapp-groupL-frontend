import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'localizedDateTime',
    pure: false
})
export class LocalizedDateTimePipe implements PipeTransform {

    constructor(private translateService: TranslateService) { }

    transform(value: any): any {
        const date = new Date(value);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleString(this.translateService.getBrowserLang(), options);
    }

}