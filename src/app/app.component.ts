import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desapp-groupL-frontend';

  constructor(private translate: TranslateService) {
    console.log('Veo cual es el idioma');
    console.log(translate.getBrowserLang());
    translate.setDefaultLang('en');

  }
}
