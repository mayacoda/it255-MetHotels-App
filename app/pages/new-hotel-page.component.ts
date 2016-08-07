import {Component} from 'angular2/core';
import {Http, Headers} from "angular2/http";
import {FormBuilder, ControlGroup, Control, Validators} from "angular2/common";
import {Hotel} from "../models/hotel.model";

@Component({
    selector: 'new-hotel-page',
    template: `
<div class="container">
    <div class="panel">
        <div class="panel-heading">
            <h3>Add a new hotel</h3>
        </div>
        
        
        <form class="panel-body" 
              [ngFormModel]="hotelForm" 
              (submit)="onAddHotel(hotelForm)">
        
            <div class="alert alert-info" *ngIf="hotelCreated">
                Hotel successfully added.
            </div>
            
            <div class="alert alert-danger" *ngIf="hotelError">
                Something went wrong.
            </div>
            
            <div class="form-group">

                <label for="location">Location:</label>
                <input type="text" 
                       id="location" 
                       class="form-control"
                       name="location"
                       [ngFormControl]="hotelForm.controls.location">
                       
                <label for="name">Name:</label>
                <input type="text" 
                       id="name" 
                       class="form-control"
                       name="name"
                       [ngFormControl]="hotelForm.controls.name">
                       
                <label for="image">Image URL:</label>
                <input type="text" 
                       id="image" 
                       class="form-control"
                       name="image"
                       [ngFormControl]="hotelForm.controls.image">
                   
            
            </div>
            <button class="btn btn-primary btn-block" 
                    type="submit"
                    [disabled]="!hotelForm.valid">
                Add Hotel
            </button>
        </form>
    </div>
    
    
    <div class="panel">
        <div class="panel-heading">
            <h3>Add a new room</h3>
        </div>
        
        <form class="panel-body" 
              [ngFormModel]="roomForm"
              (submit)="onAddRoom(roomForm)">
              
            <div class="alert alert-info" *ngIf="roomCreated">
                Room successfully added.
            </div>
            
            <div class="alert alert-danger" *ngIf="roomError">
                Something went wrong.
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
                Add Room
            </button>
            
        </form>
    </div>
</div>
`
})
export class NewHotelPageComponent {
    private hotelForm:ControlGroup;
    private roomForm:ControlGroup;
    private hotelList:Hotel[] = [];
    private hotelCreated:boolean = false;
    private hotelError:boolean = false;
    private roomCreated:boolean = false;
    private roomError:boolean = false;
    private roomTypes:string[];

    constructor(private http:Http, private formBuilder:FormBuilder) {
        this.roomTypes = ["single", "double", "apartment", "penthouse"];

        this.hotelForm = this.formBuilder.group({
            location: ['', Validators.required],
            'name': ['', Validators.required],
            image: ['', Validators.required]
        });

        this.roomForm = this.formBuilder.group({
            hotelId: ['', Validators.required],
            type: [this.roomTypes[0], Validators.required],
            area: ['', Validators.required],
            people: ['', Validators.required],
            price: ['', Validators.required]
        });

        this.getHotelList();
    }

    private getHotelList():void {
        this.http.get("http://it255.dev:8006/Hotels/pages/hotel-list.php")
            .map(res => res.json())
            .subscribe(res => this.hotelList = res);
    }

    onAddHotel(form:ControlGroup) {
        const headers = new Headers();
        const value = form.value;

        this.http.post('http://it255.dev:8006/Hotels/pages/new-hotel.php',
            JSON.stringify(value),
            {headers: headers})
            .subscribe(res => {
                this.hotelCreated = true;

                for(var name in this.hotelForm.controls) {
                    (<Control>this.hotelForm.controls[name]).updateValue('');
                    this.hotelForm.controls[name].setErrors(null);
                }

                setTimeout(_ => {
                    this.hotelCreated = false;
                }, 4000);

                this.getHotelList();
            }, err => {
                this.hotelError = true;

                setTimeout(_ => {
                    this.hotelError = false;
                }, 4000);
            });
    }

    onAddRoom(form:ControlGroup) {
        const headers = new Headers();
        const value = form.value;
        value.hotelId = parseInt(value.hotelId);

        this.http.post('http://it255.dev:8006/Hotels/pages/new-room.php',
            JSON.stringify(value),
            {headers: headers})
            .subscribe(res => {
                this.roomCreated = true;

                for(var name in this.roomForm.controls) {
                    (<Control>this.roomForm.controls[name]).updateValue('');
                    this.roomForm.controls[name].setErrors(null);
                }

                setTimeout(_ => {
                    this.roomCreated = false;
                }, 4000);
            }, err => {
                this.roomError = true;

                setTimeout(_ => {
                    this.roomError = false;
                }, 4000);
            });
    }

}