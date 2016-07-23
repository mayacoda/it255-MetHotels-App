import {Component} from '@angular/core';
import {HotelInfoComponent} from "./hotel-info.component";
import {Hotel} from "../../models/hotel.model";
import {FORM_DIRECTIVES}    from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'hotel-picker',
    templateUrl: 'hotel-picker.component.html',
    directives: [HotelInfoComponent, FORM_DIRECTIVES]
})
export class HotelPickerComponent {
    hotels:Hotel[] = HOTELS;
    selectedHotel: Hotel;
    model:any = {};

    onHotelSelected(name: string) {
        this.selectedHotel = this.hotels.find(hotel => hotel.location === name);
    }

    constructor() {
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