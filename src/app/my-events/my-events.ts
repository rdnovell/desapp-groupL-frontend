import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EventModel } from '../model/event';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEventItemsComponent } from '../modals/event-items';
import { modalChangeEvent } from '../stepper/add-event';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-my-events',
    templateUrl: './my-events.html',
    styleUrls: ['./my-events.css']
})
export class MyEventsComponent implements OnInit, AfterViewInit {

    profile: any;
    pageSize: number[] = [10, 20, 50];
    displayedColumns = ['type', 'title', 'items', 'invitados', 'date', 'expirationDate', 'actions'];
    displayedColumnsAssisted = ['type', 'title', 'items', 'invitados', 'date', 'expirationDate'];
    dataSourceCreated: MatTableDataSource<EventModel>;
    dataSourceGuest: MatTableDataSource<EventModel>;
    dataSourceAssisted: MatTableDataSource<EventModel>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private authService: AuthService, private dataService: DataService, private modalService: NgbModal, private translateService: TranslateService) {

        const ELEMENT_DATA: EventModel[] = [];

        this.dataSourceCreated = this.initDataSource(ELEMENT_DATA);
        this.dataSourceGuest = this.initDataSource(ELEMENT_DATA);
        this.dataSourceAssisted = this.initDataSource(ELEMENT_DATA);

        modalChangeEvent.on('changeEvents', () => {
            this.getEvents(this.profile.email);
        });
    }

    ngOnInit() {
        if (this.authService.userProfile) {
            this.profile = this.authService.userProfile;
        } else {
            this.authService.getProfile((err, profile) => {
                this.profile = profile;
                this.getEvents(this.profile.email);
            });
        }
    }

    ngAfterViewInit() {
        this.translateService.get('profile.secondTabContent.paginatorLabel').subscribe(resp => {
            this.paginator._intl.itemsPerPageLabel = resp;
        });
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

    delEvent(row: any) {
        this.dataService.delEvent(row.id).subscribe(resp => {
            this.dataService.getOwnerEvents(this.profile.email).subscribe(data => {
                this.dataSourceCreated.data = data;
            });
        });
    }

    checkItems(row: any) {
        const modalRef = this.modalService.open(ModalEventItemsComponent, { backdrop: 'static', keyboard: false, centered: true });
        modalRef.componentInstance.items = row.items;
        modalRef.componentInstance.id = row.id;
    }

    checkGuest(row: any) {
        console.log('lanzo el modal para revisar invitados' );
    }

    getEvents(email: string) {
        this.dataService.getOwnerEvents(email).subscribe(resp => {
            this.dataSourceCreated.data = resp;
        });
        this.dataService.getGuestedEvents(email).subscribe(resp => {
            this.dataSourceGuest.data = resp;
        });
        this.dataService.getAssistedEvents(email).subscribe(resp => {
            this.dataSourceAssisted.data = resp;
        });
    }

    assistToEvent(row: any) {
        const data = {userEmail: this.profile.email, eventId: row.id};
        this.dataService.assistToAnEvent(data).subscribe(resp => { this.getEvents(this.profile.email); });
    }

    private initDataSource(ELEMENT_DATA) {
        const dataSource = new MatTableDataSource<EventModel>(ELEMENT_DATA);
        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;
        return dataSource;
    }
}
