import {Component, OnInit, Input} from "@angular/core";
import {Hotel} from "../../models/hotel.model";

@Component({
    moduleId: module.id,
    selector: 'hotel-info',
    templateUrl: 'hotel-info.component.html'
})
export class HotelInfoComponent implements OnInit {
    @Input() hotel: Hotel;

    constructor() {
    }

    ngOnInit() {
    }

}