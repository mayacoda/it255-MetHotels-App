import {Component, OnInit, Input} from "angular2/core";
import {Hotel} from "../../models/hotel.model";

@Component({
    selector: 'hotel-info',
    templateUrl: 'app/components/hotel-picker/hotel-info.component.html'
})
export class HotelInfoComponent implements OnInit {
    @Input() hotel: Hotel;

    constructor() {
    }

    ngOnInit() {
    }

}