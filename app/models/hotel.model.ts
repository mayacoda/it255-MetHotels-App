export interface Hotel {
    image: string;
    location: string;
    rooms: Array<Room>
}

export interface Room {
    type: string,
    price: number,
    area?: number,
    people: number
}