import {Pipe} from 'angular2/core';
import {Room} from "../models/hotel.model";
@Pipe({
    name: 'roomSearch'
})
export class RoomSearchPipe {
    transform(rooms:Room[], queryArray?:string[]) {
        if (rooms === null) {
            return null;
        }

        const query = queryArray[0];

        if (!query) {
            return rooms;
        }

        // query is for price
        if (query.charAt(0) === "$") {
            const dollarQuery = parseInt(query.substring(1));

            return rooms.filter(room => {
                return room.price <= dollarQuery;
            });

        // query is for room type
        } else if (isNaN(parseInt(query))) {
            const regex = new RegExp(query.toLowerCase().split('').join('.*'));

            return rooms.filter(room => {
                return room.type.search(regex) > -1;
            });

        // query is for people or room area
        } else {
            const numberQuery = parseInt(query);

            return rooms.filter(room => {
                return room.area >= numberQuery || room.people >= numberQuery;
            });
        }
    }
}
