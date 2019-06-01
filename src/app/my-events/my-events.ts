import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EventModel} from '../model/event';
import {AuthService} from '../service/auth.service';
import {DataService} from '../service/data.service';

@Component({
    selector: 'app-my-events',
    templateUrl: './my-events.html'
})
export class MyEventsComponent implements OnInit, AfterViewInit {

    profile: any;
    pageSize: number[] = [10, 20, 50];
    displayedColumns = ['type', 'title', 'items', 'invitados', 'date', 'expirationDate'];
    dataSourceCreated: MatTableDataSource<EventModel>;
    dataSourceGuest: MatTableDataSource<EventModel>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private authService: AuthService, private dataService: DataService) {

        const ELEMENT_DATA: EventModel[] = [];

        this.dataSourceCreated = new MatTableDataSource(ELEMENT_DATA);
        this.dataSourceCreated.paginator = this.paginator;
        this.dataSourceCreated.sort = this.sort;

        this.dataSourceGuest = new MatTableDataSource(ELEMENT_DATA);
        this.dataSourceGuest.paginator = this.paginator;
        this.dataSourceGuest.sort = this.sort;
    }

    ngOnInit() {
        if (this.authService.userProfile) {
            this.profile = this.authService.userProfile;
        } else {
            this.authService.getProfile((err, profile) => {
                this.profile = profile;
                this.dataService.getOwnerEvents(this.profile.email).subscribe(resp => {
                    this.dataSourceCreated.data = resp;
                });
                this.dataService.getGuestedEvents(this.profile.email).subscribe(resp => {
                    this.dataSourceGuest.data = resp;
                });
            });
        }
    }

    ngAfterViewInit() {
        this.paginator._intl.itemsPerPageLabel = 'Cantidad de eventos por página:';
    }

    applyFilterGuest(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSourceGuest.filter = filterValue;
    }

    applyFilterCreated(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSourceCreated.filter = filterValue;
    }
}
