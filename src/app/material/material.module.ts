import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatListModule, MatSidenavModule, MatMenuModule, MatCardModule, MatTabsModule } from '@angular/material';

const modules = [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule
]

@NgModule({
    imports: modules,
    exports: modules,
    declarations: []
})
export class MaterialModule { }
