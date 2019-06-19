import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {EventModel} from '../model/event';


@Component({
    selector: 'app-financial-service',
    templateUrl: './financial-service.html',
    styleUrls: ['./financial-service.css']
})
export class FinancialServiceComponent implements OnInit {
    isLinear = false;
    creditAvailable = false;
    profile: any;
    displayedColumns = ['date'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor( private authService: AuthService, private dataService: DataService) { }

    send() {
        console.log('send ' + this.profile.email);
        this.dataService.createLoan(this.profile.email).subscribe(resp => console.log(resp));
    }

    ngOnInit() {

        if (this.authService.userProfile) {
            this.profile = this.authService.userProfile;
        } else {
            this.authService.getProfile((err, profile) => {
                this.profile = profile;
                console.log(this.profile.email);

                this.dataSource = new MatTableDataSource<any>([]);
                this.dataSource.paginator = this.paginator;
                this.dataService.getUserLoans(this.profile.email).subscribe( resp => {
                    console.log('me llegaron estos prestamos ' + resp);
                    this.dataSource.data = resp;
                });
                this.dataService.getAvailableLoan(this.profile.email).subscribe( resp => this.creditAvailable = resp);

            });
        }

    }
}
