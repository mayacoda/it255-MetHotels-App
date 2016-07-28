import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";

@Component({
    selector: 'navigation',
    templateUrl: 'app/components/navigation/navigation.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavigationComponent implements OnInit {
    query: string;
    showSearch: boolean = true;

    constructor(private router: Router) {
    }

    onSearch(query: string) {
        this.router.navigate(["Search", {query: query}]);
    }

    ngOnInit() {
        this.router.subscribe(page => {
            // do not show navigation search on search page
            this.showSearch = page.search(/search/) === -1;
        })
    }
}