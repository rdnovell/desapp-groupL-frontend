import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { format } from 'currency-formatter';


@Pipe({
    name: 'localCurrency',
    pure: false
})
export class LocalizedCurrencyPipe implements PipeTransform {

    constructor(private translateService: TranslateService) { }

    transform(value: any): any {
        const lang = this.translateService.getBrowserCultureLang();
        return format(value, {locale: lang, format: '%s %v'});
    }

}
