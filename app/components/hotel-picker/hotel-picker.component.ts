import {Component} from 'angular2/core';
import {HotelInfoComponent} from "./hotel-info.component";
import {Hotel} from "../../models/hotel.model";
import {FORM_DIRECTIVES, ControlGroup, Control, Validators}    from 'angular2/common';

@Component({
    selector: 'hotel-picker',
    templateUrl: 'app/components/hotel-picker/hotel-picker.component.html',
    directives: [HotelInfoComponent, FORM_DIRECTIVES]
})
export class HotelPickerComponent {
    hotels:Hotel[] = HOTELS;
    selectedHotel:Hotel;
    hotelForm:ControlGroup;
    model:any = {};

    onHotelSelected(name:string) {
        this.selectedHotel = this.hotels.filter(hotel => hotel.location === name)[0];
    }

    constructor() {

        this.hotelForm = new ControlGroup({
            firstName: new Control('', Validators.required),
            lastName: new Control('', Validators.required),
            hotel: new Control(this.hotels[0].location, Validators.required),
            from: new Control('', Validators.required),
            to: new Control('', Validators.required),
            people: new Control('', Validators.required)
        });

        console.log(this.hotelForm);

        this.model.hotel = this.hotels[0].location;
        this.selectedHotel = this.hotels[0];
    }
}


const HOTELS:Hotel[] = [
    {
        image: 'images/hotel1.jpg',
        location: 'New York City',
        rooms: [
            {
                type: 'Single',
                price: 300,
                people: '1'
            },
            {
                type: 'Double',
                price: 400,
                people: '2'
            },
            {
                type: 'Apartment Suite',
                price: 700,
                people: '3+'
            }
        ]
    },
    {
        image: 'images/hotel2.jpg',
        location: 'Belgrade, Serbia',
        rooms: [
            {
                type: 'Single',
                price: 300,
                people: '1'
            },
            {
                type: 'Double',
                price: 400,
                people: '2'
            },
            {
                type: 'Apartment Suite',
                price: 700,
                people: '3+'
            }
        ]
    },
    {
        image: 'images/hotel3.jpg',
        location: 'Barcelona, Spain',
        rooms: [
            {
                type: 'Single',
                price: 300,
                people: '1'
            },
            {
                type: 'Double',
                price: 400,
                people: '2'
            },
            {
                type: 'Apartment Suite',
                price: 700,
                people: '3+'
            }
        ]
    },
    {
        image: 'images/hotel4.jpg',
        location: 'Bangkok, Thailand',
        rooms: [
            {
                type: 'Single',
                price: 300,
                people: '1'
            },
            {
                type: 'Double',
                price: 400,
                people: '2'
            },
            {
                type: 'Apartment Suite',
                price: 700,
                people: '3+'
            }
        ]
    }
];