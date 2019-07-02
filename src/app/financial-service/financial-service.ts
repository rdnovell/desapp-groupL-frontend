import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-financial-service',
    templateUrl: './financial-service.html',
    styleUrls: ['./financial-service.css']
})
export class FinancialServiceComponent implements OnInit {
    isLinear = false;
    creditAvailable = false;
    profile: any;
    displayedColumns = ['id', 'creditSituation', 'date', 'email', 'loanAmount', 'loanTerm', 'loanTermsPayed', 'monthlyPayback'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor( private authService: AuthService, private dataService: DataService) { }

    send() {
        console.log('send ' + this.profile.email);
        this.dataService.createLoan(this.profile.email).subscribe(() => this.updateLoans(this.profile.email));
    }

    ngOnInit() {

        if (this.authService.userProfile) {
            this.profile = this.authService.userProfile;
        } else {
            this.authService.getProfile((err, profile) => {
                this.profile = profile;
                this.dataSource = new MatTableDataSource<any>([]);
                this.dataSource.paginator = this.paginator;
                this.updateLoans(this.profile.email);
                this.dataService.getAvailableLoan(this.profile.email).subscribe((resp: any) => this.creditAvailable = resp);

            });
        }
    }

    updateLoans(email) {
        this.dataService.getUserLoans(email).subscribe((resp: any) => {
            this.dataSource.data = resp;
        });
    }
}
