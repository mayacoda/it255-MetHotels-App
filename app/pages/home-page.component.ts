import {Component} from "angular2/core";
import {AppHeadingComponent} from "../components/app-heading/app-heading.component";
import {HotelPickerComponent} from "../components/hotel-picker/hotel-picker.component";

@Component({
    selector: 'home-page',
    templateUrl: 'app/pages/home-page.component.html',
    directives: [AppHeadingComponent, HotelPickerComponent]

})
export class HomePageComponent {
    constructor() { }
}