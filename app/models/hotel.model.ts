export interface Hotel {
    image: string;
    location: string;
    rooms: Array<{type: string, price: number, people: string}>
}