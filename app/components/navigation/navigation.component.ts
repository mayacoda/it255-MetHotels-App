import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'navigation',
    templateUrl: 'app/components/navigation/navigation.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavigationComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

}