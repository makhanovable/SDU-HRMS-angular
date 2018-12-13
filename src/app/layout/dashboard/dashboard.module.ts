import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {PageHeaderModule} from './../../shared';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports: [CommonModule, DashboardRoutingModule,
        PageHeaderModule, MatButtonModule, MatListModule,
        MatTableModule, MatFormFieldModule, MatPaginatorModule,
        MatProgressSpinnerModule, MatSelectModule, MatInputModule],
    declarations: [DashboardComponent]
})
export class DashboardModule {
}
