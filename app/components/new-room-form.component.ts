import {Component, Input} from 'angular2/core';
import {Hotel} from "../models/hotel.model";
import {ControlGroup, Validators, FormBuilder, Control} from "angular2/common";
import {Headers, Http} from "angular2/http";

@Component({
    selector: 'new-room-form',
    template: `    
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
`
})
export class NewRoomFormComponent {
    @Input()
    private hotelList: Hotel[];
    private roomForm:ControlGroup;
    private roomTypes:string[];
    private roomCreated:boolean = false;
    private roomError:boolean = false;


    constructor(private formBuilder: FormBuilder, private http: Http) {
        this.roomTypes = ["single", "double", "apartment", "penthouse"];

        this.roomForm = this.formBuilder.group({
            hotelId: ['', Validators.required],
            type: [this.roomTypes[0], Validators.required],
            area: ['', Validators.required],
            people: ['', Validators.required],
            price: ['', Validators.required]
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