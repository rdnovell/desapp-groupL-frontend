import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EventModel} from '../model/event';
import {AuthService} from '../service/auth.service';
import {DataService} from '../service/data.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-top-events',
    templateUrl: './top-events.html',
    styleUrls: ['./top-events.css']
})
export class TopEventsComponent implements OnInit, AfterViewInit {

    pageSize: number[] = [10, 20, 50];
    displayedColumns = ['type', 'title', 'items', 'invitados', 'date', 'expirationDate'];
    dataSourceTop: MatTableDataSource<EventModel>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private authService: AuthService, private dataService: DataService, private translateService: TranslateService) {

        const ELEMENT_DATA: EventModel[] = [];

        this.dataSourceTop = new MatTableDataSource(ELEMENT_DATA);
        this.dataSourceTop.paginator = this.paginator;
        this.dataSourceTop.sort = this.sort;

    }

    ngOnInit() {
        this.dataService.getTopEvents().subscribe(resp => {
            this.dataSourceTop.data = resp;
        });
    }

    ngAfterViewInit() {
        this.translateService.get('profile.secondTabContent.paginatorLabel').subscribe(resp => {
            this.paginator._intl.itemsPerPageLabel = resp;
        });
    }

    applyFilterCreated(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSourceTop.filter = filterValue;
    }
}
