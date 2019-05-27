import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatListModule, MatSidenavModule, MatMenuModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const modules = [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
]

@NgModule({
    imports: modules,
    exports: modules,
    declarations: []
})
export class MaterialModule { }
