import {Component} from 'angular2/core';
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {Http, Headers} from "angular2/http";
import {RouteParams, Router} from "angular2/router";
import {Room, Hotel} from "../models/hotel.model";

@Component({
    selector: 'edit-room-page',
    template: `
<div class="container">
    
    <div class="panel col-lg-6 col-md-8">
        <div class="panel-heading">
            <h3>Edit Room</h3>
            <button class="btn btn-default" (click)="onDelete(room)">Delete</button>
        </div>
        
        <form class="panel-body" 
              [ngFormModel]="roomForm"
              (submit)="onSaveChanges(roomForm)">
              
            <div class="alert alert-info" *ngIf="roomUpdated">
                Room successfully updated.
            </div>
            
            <div class="alert alert-info" *ngIf="roomDeleted">
                Room successfully deleted.
            </div>
            
            <div class="alert alert-danger" *ngIf="roomError">
                Something went wrong.
            </div>
            
            <div class="alert alert-danger" *ngIf="roomDoesntExist">
                This room has been removed.
            </div>
            
            <div class="alert alert-danger" *ngIf="roomAuthError">
                You do not have authorization to edit this room.
            </div>
            
             <div class="form-group"> 
                 <label for="hotel">Hotel:</label>
                 <select name="hotel" 
                         id="hotel" 
                         class="form-control"
                         [ngFormControl]="roomForm.controls.hotelId">
                    <option value="{{ hotel.id }}"
                            *ngFor="#hotel of hotelList">
                        {{ hotel.name }} ({{ hotel.location }})
                    </option>         
                 </select>
            
                 <label for="room_type">Room Type:</label>
                 <select name="roomType" 
                         id="room_type" 
                         class="form-control"
                         [ngFormControl]="roomForm.controls.type">
                    <option value="{{roomForm.controls.type.value}}" 
                            *ngFor="#room of roomTypes">
                        {{ room }}
                    </option>         
                 </select>
            
            
                <label for="area">Area:</label>
        
                <input type="number"
                       min="5"
                       id="area" 
                       class="form-control"
                       name="area"
                       [ngFormControl]="roomForm.controls.area">
                       
                <label for="people">Number of people:</label>
        
                <input type="number"
                       min="1"
                       id="people" 
                       class="form-control"
                       name="people"
                       [ngFormControl]="roomForm.controls.people">  
                            
                <label for="price">Price:</label>
        
                <input type="number"
                       min="5"
                       id="price" 
                       class="form-control"
                       name="price"
                       [ngFormControl]="roomForm.controls.price">
                   
               </div>
            <button class="btn btn-primary btn-block" 
                    type="submit"
                    [disabled]="!roomForm.valid">
                Save Changes
            </button>
            
        </form>
    </div>
</div>`
})
export class EditRoomPageComponent {
    private hotelList:Hotel[];
    private roomForm:ControlGroup;
    private roomTypes:string[];
    private roomUpdated:boolean = false;
    private roomDeleted:boolean = false;
    private roomError:boolean = false;
    private roomDoesntExist: boolean = false;
    private roomAuthError:boolean = false;
    private room:Room;
    private headers:Headers;

    constructor(private formBuilder:FormBuilder,
                private http:Http,
                private routeParams:RouteParams,
                private router:Router) {
        this.roomTypes = ["single", "double", "apartment", "penthouse"];

        this.roomForm = this.formBuilder.group({
            hotelId: ['', Validators.required],
            type: [this.roomTypes[0], Validators.required],
            area: ['', Validators.required],
            people: ['', Validators.required],
            price: ['', Validators.required]
        });

        const id = this.routeParams.get('id');

        this.headers = new Headers();
        const token = localStorage.getItem('token');
        this.headers.append('token', token);

        this.http.get('http://it255.dev:8006/Hotels/pages/room-list.php?id=' + id,
            {headers: this.headers})
            .map(res => res.json())
            .subscribe(room => {
                this.room = room;

                (<Control>this.roomForm.controls['hotelId']).updateValue(room.hotelId);
                (<Control>this.roomForm.controls['type']).updateValue(room.type);
                (<Control>this.roomForm.controls['people']).updateValue(room.people);
                (<Control>this.roomForm.controls['area']).updateValue(room.area);
                (<Control>this.roomForm.controls['price']).updateValue(room.price);

            }, err => {
                if (err.status === 401) {
                    this.roomAuthError = true;
                } else if (err.status === 404) {
                    this.roomDoesntExist = true;
                } else {
                    this.roomError = true;
                }
            });

        this.http.get('http://it255.dev:8006/Hotels/pages/hotel-list.php',
            {headers: this.headers})
            .map(res => res.json())
            .subscribe(hotels => {
                this.hotelList = hotels;
            }, err => {
                if (err.status === 401) {
                    this.roomAuthError = true;
                } else {
                    this.roomError = true;
                }
            });

    }

    private onSaveChanges(roomForm:ControlGroup) {
        let val = roomForm.value;
        val = (<any> Object).assign(val, {id: this.room.id});

        this.http.put('http://it255.dev:8006/Hotels/pages/update-room.php',
            JSON.stringify(val),
            {headers: this.headers})
            .subscribe(res => {
                this.roomUpdated = true;

                setTimeout(() => {
                    this.roomUpdated = false;
                }, 4000);

            }, err => {
                if (err.status === 401) {
                    this.roomAuthError = true;
                } else {
                    this.roomError = true;
                }
            })
    }

    private onDelete(room:Room) {

        this.http.delete('http://it255.dev:8006/Hotels/pages/delete-room.php?id=' + this.room.id,
            {headers: this.headers})
            .subscribe(res => {
                this.roomDeleted = true;

                setTimeout(() => {
                    this.roomDeleted = false;
                    this.router.navigate(['/Home']);
                }, 2000);
            }, err => {
                if (err.status === 401) {
                    this.roomAuthError = true;
                } else {
                    this.roomError = true;
                }
            });
    }
}