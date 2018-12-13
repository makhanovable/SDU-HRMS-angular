import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {ResultRecord} from './result.record';
import {SearchService} from './search.service';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    @ViewChild('input') input: ElementRef;
    data: ResultRecord[] = [];
    temp: ResultRecord[] = [];
    isLoadingResult = false;
    count: number;
    displayedColumns = ['pos', 'age', 'exp', 'last_j', 'info'];

    wrd = '';
    exp = 'no';
    sal = 'no';
    src = 'hh';

    constructor(private http: SearchService) {
    }

    ngOnInit() {
    }

    search(str: string) {
        this.wrd = str;
        console.log('searching for = ' + this.wrd + ', exp = ' + this.exp
            + ', sal = ' + this.sal + ', src = ' + this.src);

        let params = new HttpParams();
        params = params.set('wrd', this.wrd);
        params = params.set('exp', this.exp);
        params = params.set('sal', this.sal);
        params = params.set('src', this.src);
        params = params.set('page', '0');
        this.load(params);
    }

    loadPage(event) {
        console.log('searching for = ' + this.wrd + ', exp = ' + this.exp
            + ', sal = ' + this.sal + ', src = ' + this.src);

        let params = new HttpParams();
        params = params.set('wrd', this.wrd);
        params = params.set('exp', this.exp);
        params = params.set('sal', this.sal);
        params = params.set('src', this.src);
        params = params.set('page', event.pageIndex + '');
        this.load(params);
    }

    load(params: HttpParams) {
        this.isLoadingResult = true;
        this.temp = [];
        this.data = [];
        this.http.get('http://localhost:8080/search/', {params: params}).subscribe(value => {
                const str_count = JSON.stringify(value.count).replace(/["]+/g, '');
                this.count = +str_count;
                for (const val of value.list) {
                    const resRecord = new ResultRecord(val);
                    this.temp.push(resRecord);
                }
                this.data = this.temp;
                this.isLoadingResult = false;
            },
            error => {
                console.log(error);
                this.isLoadingResult = false;
            });
    }

    info(str: string) {
        if (str !== '') {
            window.open(str, '_blank');
            console.log('url = ' + str);
        } else {
            console.log('empty url');
        }
    }

    expF(event) {
        console.log(event.value);
        this.exp = event.value;
    }

    salF(event) {
        console.log(event.value);
        this.sal = event.value;
    }

    srcF(event) {
        console.log(event.value);
        this.src = event.value;
    }

}
