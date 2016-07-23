import {Component} from "@angular/core";
import {AppHeadingComponent} from "../components/app-heading/app-heading.component";
import {HotelPickerComponent} from "../components/hotel-picker/hotel-picker.component";

@Component({
    moduleId: module.id,
    selector: 'home-page',
    templateUrl: 'home-page.component.html',
    directives: [AppHeadingComponent, HotelPickerComponent]

})
export class HomePageComponent {
    constructor() { }
}