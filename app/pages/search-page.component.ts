import {Component, OnInit, Pipe, PipeTransform} from "angular2/core";
import {Http} from "angular2/http";
import {Observable} from "rxjs/Rx";
import {Room} from "../models/hotel.model";
import {RouteParams} from "angular2/router";
import 'rxjs/Rx';
import {RoomSearchPipe} from "../pipes/search.pipe";


@Component({
    selector: 'search-page',
    template: `
<div class="container">
    <div class="panel row">
        <form class="panel-body col-md-4" #search="ngForm">
            <label class="control-label">Search:
                    <input type="text" class="form-control" [(ngModel)]="query">
            </label>
            <p class="help-block">
            Search starting with a $ will return rooms that are at or below that price level. Textual searches return results based on room type. Numerical searches return rooms with that number of people or more, or that amount of area or more.
            </p>
        </form>
    </div>
    <div class="panel" *ngFor="#room of roomList | async | roomSearch:query ">
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
    query:string;

    constructor(private http:Http, private routeParams:RouteParams) {
    }

    ngOnInit() {
        this.query = this.routeParams.get('query');

        this.roomList = this.http.get('http://it255.dev:8006/Hotels/pages/room-list.php')
            .map(res => {
                return res.json();
            });
    }

}

