import {Component, OnInit, Input} from "angular2/core";
import {Hotel} from "../../models/hotel.model";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'hotel-info',
    templateUrl: 'app/components/hotel-picker/hotel-info.component.html'
})
export class HotelInfoComponent implements OnInit {
    @Input() hotel:Observable<Hotel>;
    private hotelValue:Hotel = {id: 0, image: '', location: '', name: '', rooms: []};

    constructor() {
    }

    ngOnInit() {
        this.hotel
            .filter(hotel => !!(hotel))
            .subscribe(hotel => {
                this.hotelValue = hotel;
                let table;

                //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
                if ($.fn.dataTable.isDataTable('.data-table')) {

                    //noinspection TypeScriptUnresolvedFunction
                    table = $('.data-table').DataTable();
                    table.clear();
                    table.rows.add(hotel.rooms).draw();
                }
                else {
                    //noinspection TypeScriptUnresolvedFunction
                    table = $('.data-table').DataTable({
                        data: hotel.rooms, // Data Table must load data to be shown, can't load it directly from DOM
                        columns: [
                            {data: 'type'},
                            {data: 'area'},
                            {data: 'price'},
                            {data: 'people'}
                        ]
                    });
                }
            });
    }

}