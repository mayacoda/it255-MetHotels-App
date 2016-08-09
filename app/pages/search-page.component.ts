import {Component, OnInit} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {Room} from "../models/hotel.model";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import "rxjs/Rx";
import {RoomSearchPipe} from "../pipes/search.pipe";
import {Control} from "angular2/common";


@Component({
    selector: 'search-page',
    directives: [ROUTER_DIRECTIVES],
    template: `
<div class="container">
    <div class="panel row">
        <div class="panel-body">
            <p class="help-block">
                The search below is synchronized with the table. Changing the query will change the search inside the table and load new results.
            </p>
            <table class="display data-table">
                <thead>
                    <tr>
                    <th>
                        Type:
                    </th>
                    <th>
                        Number of People:
                    </th>
                    <th>
                        Area:
                    </th>
                    <th>
                        Price:
                    </th>
                    </tr>
                </thead>
    
                <tbody>
                </tbody>
            </table>
        </div>
	    
	</div>

    <div class="panel row">
        <form class="panel-body" #search="ngForm">
            <label class="control-label col-md-4">Search:
                    <input 
                     type="text"
                     class="form-control" 
                     name="queryForm"
                     [ngFormControl]="queryForm"
                     [(ngModel)]="query">
            </label>
            <p class="help-block">
            Search starting with a $ will return rooms that are at or below that price level. Textual searches return 
            results based on room type. Numerical searches return rooms with that number of people or more, or that 
            amount of area or more.
            </p>
            
            <div class="alert alert-danger" *ngIf="isForbidden">
                Only users who are logged in can access the search.
            </div>
        </form>
    </div>
    <div class="panel" *ngFor="#room of roomList | async | roomSearch:query ">
        <div class="panel-heading">
            <a [routerLink]="['/Edit', {id: room.id}]">Edit this room</a>
        </div>
        <div class="panel-body">
            <p><strong>Type:</strong> {{ room.type }}</p>
            <p><strong>Area:</strong> {{ room.area }}m2</p>
            <p><strong>Price:</strong> $ {{ room.price }}</p>
            <p><strong>Number of people:</strong> {{ room.people }}</p>
        </div>    
    </div>
</div>
`,
    pipes: [RoomSearchPipe]
})
export class SearchPageComponent implements OnInit {
    roomList:Observable<Room[]>;
    rooms: Room[];
    query:string;
    queryForm: Control = new Control();
    isForbidden:boolean;
    table: any;

    constructor(private http:Http, private routeParams:RouteParams) {
    }

    ngOnInit() {
        this.query = this.routeParams.get('query');
        const headers = new Headers();
        const token = localStorage.getItem('token');

        headers.append('token', token);
        this.http.get('http://it255.dev:8006/Hotels/pages/room-list.php',
            {headers: headers})
            .map(res => res.json())
            .subscribe(res => {
                this.roomList = Observable.of(res);
                this.rooms = res;
                //noinspection TypeScriptUnresolvedFunction
                this.table = $('.data-table').DataTable({
                    data: res, // Data Table must load data to be shown, can't load it directly from DOM
                    columns: [
                        {data: 'type'},
                        {data: 'area'},
                        {data: 'price'},
                        {data: 'people'}
                    ]
                });

                this.table.search(this.query).draw();

                this.queryForm.valueChanges.subscribe(query => {
                    this.table.search(query).draw();
                });
            }, err => {
                if (err.status === 401) {
                    this.isForbidden = true;
                }
            });
    }

}

