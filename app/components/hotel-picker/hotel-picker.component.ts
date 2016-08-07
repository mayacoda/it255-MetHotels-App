import {Component} from 'angular2/core';
import {HotelInfoComponent} from "./hotel-info.component";
import {Hotel} from "../../models/hotel.model";
import {FORM_DIRECTIVES, ControlGroup, Control, Validators}    from 'angular2/common';
import {Http} from "angular2/http";

@Component({
    selector: 'hotel-picker',
    templateUrl: 'app/components/hotel-picker/hotel-picker.component.html',
    directives: [HotelInfoComponent, FORM_DIRECTIVES]
})
export class HotelPickerComponent {
    hotels: Hotel[];
    selectedHotel:Hotel;
    hotelForm:ControlGroup;
    model:any = {};

    onHotelSelected(id: number) {
        this.selectedHotel = this.hotels.filter(hotel => hotel.id === id)[0];
    }

    constructor(private http: Http) {
        this.hotelForm = new ControlGroup({
            firstName: new Control('', Validators.required),
            lastName: new Control('', Validators.required),
            hotel: new Control('', Validators.required),
            from: new Control('', Validators.required),
            to: new Control('', Validators.required),
            people: new Control('', Validators.required)
        });

        http.get("http://it255.dev:8006/Hotels/pages/hotel-list-rooms.php")
            .map(res => res.json())
            .subscribe(res => {
                this.hotels = res;

                (<Control>this.hotelForm.controls["hotel"]).updateValue(this.hotels[0].id);
                this.model.hotel = this.hotels[0].id;
                this.selectedHotel = this.hotels[0];
            });


    }
}