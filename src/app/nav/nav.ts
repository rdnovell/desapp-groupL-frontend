import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.html',
    styleUrls: ['./nav.css']
})
export class NavComponent {

    constructor(public auth: AuthService) { }

}
