import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatListModule, MatSidenavModule, MatMenuModule, MatNativeDateModule } from '@angular/material';
import { MatTabsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule, MatStepperModule, MatDatepickerModule, MatButtonModule, MatSelectModule, MatSortModule } from '@angular/material';

const modules = [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSortModule,
]

@NgModule({
    imports: modules,
    exports: modules,
    declarations: []
})
export class MaterialModule { }
