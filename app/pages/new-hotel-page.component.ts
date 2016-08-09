import {Component} from 'angular2/core';
import {Http, Headers} from "angular2/http";
import {FormBuilder, ControlGroup, Control, Validators} from "angular2/common";
import {Hotel} from "../models/hotel.model";
import {NewRoomFormComponent} from "../components/new-room-form.component";

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
    
    <new-room-form [hotelList]="hotelList"></new-room-form>    
</div>
`,
    directives: [NewRoomFormComponent]
})
export class NewHotelPageComponent {
    private hotelForm:ControlGroup;
    private hotelList:Hotel[] = [];
    private hotelCreated:boolean = false;
    private hotelError:boolean = false;


    constructor(private http:Http, private formBuilder:FormBuilder) {

        this.hotelForm = this.formBuilder.group({
            location: ['', Validators.required],
            'name': ['', Validators.required],
            image: ['', Validators.required]
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

                for(const name in this.hotelForm.controls) {
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
}