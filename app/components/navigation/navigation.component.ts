import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs/Rx";
import {User} from "../../models/user.model";

@Component({
    selector: 'navigation',
    templateUrl: 'app/components/navigation/navigation.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavigationComponent implements OnInit {
    query: string;
    showSearch: boolean = true;
    currentUser: Observable<User>;

    constructor(private router: Router, private userService: UserService) {
        this.currentUser = userService.getUser();
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

    logOut(): void {
        this.userService.removeToken();
    }
}