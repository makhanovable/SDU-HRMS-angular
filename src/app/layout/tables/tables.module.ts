import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TablesRoutingModule} from './tables-routing.module';
import {TablesComponent} from './tables.component';
import {PageHeaderModule} from './../../shared';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [CommonModule, TablesRoutingModule,
        PageHeaderModule, MatButtonModule, MatListModule,
        MatTableModule, MatFormFieldModule, MatPaginatorModule,
        MatProgressSpinnerModule],
    declarations: [TablesComponent]
})
export class TablesModule {
}
