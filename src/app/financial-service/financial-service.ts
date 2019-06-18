import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-financial-service',
    templateUrl: './financial-service.html',
    styleUrls: ['./financial-service.css']
})
export class FinancialServiceComponent implements OnInit {
    isLinear = false;
    creditAvailable = false;
    profile: any;

    constructor( private authService: AuthService, private dataService: DataService) { }
    send() {

    }

    ngOnInit() {

        if (this.authService.userProfile) {
            this.profile = this.authService.userProfile;
        } else {
            this.authService.getProfile((err, profile) => {
                this.profile = profile;
                console.log(this.profile.email);
                this.dataService.getAvailableLoan(this.profile.email).subscribe( resp => this.creditAvailable = resp);
            });
        }

    }
}
