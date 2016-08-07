export interface Hotel {
    image: string;
    id: number;
    name?: string;
    location: string;
    rooms: Array<Room>
}

export interface Room {
    type: string,
    hotelId: number;
    price: number,
    area?: number,
    people: number
}