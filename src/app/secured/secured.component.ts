import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {GroupService} from 'sparkworks-cargo-client/api/group.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {ResourceService} from 'sparkworks-cargo-client/api/resource.service';
import {Subject} from 'rxjs';
import {GroupDTO} from 'sparkworks-cargo-client/model/groupDTO';
import {ResourceDTO} from "sparkworks-cargo-client/model/resourceDTO";

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.css']
})
export class SecuredComponent implements OnInit, OnDestroy {

  roles: Array<string> = [];
  groupsCount = 0;
  resourcesCount = 0;

  groups: Array<GroupDTO> = [];
  resources: Array<ResourceDTO> = [];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTriggerGroupsTable: Subject<any> = new Subject();
  dtTriggerResourcesTable: Subject<any> = new Subject();

  constructor(private authService: AuthService,
              private oauthService: OAuthService,
              private groupService: GroupService,
              private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    if (this.authService.getUserAuthorities()) {
      this.roles = this.authService.getUserAuthorities()['authorities'].map(authority => authority['authority']);
    } else {
      this.oauthService.loadUserProfile().then(value => {
        this.roles = JSON.parse(localStorage.getItem('id_token_claims_obj'))['authorities'].map(authority => authority['authority']);
      });
    }
    this.groupService.countGroups().subscribe(value => {
      console.log('Groups found: ' + value);
      this.groupsCount = value;
    },
      error => {
        console.error('Couldn\'t count groups.');
      });
    this.resourceService.countResources().subscribe(value => {
        console.log('Resources found: ' + value);
        this.resourcesCount = value;
      },
      error => {
        console.error('Couldn\'t count resources.');
      });
    this.groupService.getAllGroups().subscribe(value => {
      this.groups = value;
      console.log('groups received');
      this.dtTriggerGroupsTable.next();
    }, error => {
      console.error(error);
    });
    this.resourceService.getResources().subscribe(value => {
      this.resources = value;
      console.log('resources received');
      this.dtTriggerResourcesTable.next();
    },
      error => {
        console.log(error);
      });
    this.dtTriggerGroupsTable.next();
    this.dtTriggerResourcesTable.next();
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTriggerGroupsTable.unsubscribe();
    this.dtTriggerResourcesTable.unsubscribe();
  }
}
