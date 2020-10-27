import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GroupDTO} from 'sparkworks-cargo-client/model/groupDTO';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

declare var $: any;

@Component({
  selector: 'app-groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.css']
})
export class GroupsTableComponent implements OnInit, OnChanges {

  @Input()
  groups: Array<GroupDTO> = [];

  @Input()
  visibility: any = {
    uuid: true,
    name: true,
    path: true,
    createdDate: true
  };

  @Input()
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10
  };

  @Input()
  dtTrigger: Subject<any> = new Subject();

  innerDtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isDtInitialized = false;

  constructor() { }

  ngOnInit() {
    this.dtTrigger.asObservable().subscribe(() => {
      this.refreshDatatable();
    });
  }

  refreshDatatable() {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.innerDtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.innerDtTrigger.next();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groups.currentValue !== changes.groups.previousValue && !changes.groups.isFirstChange()) {
      this.refreshDatatable();
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.innerDtTrigger.unsubscribe();
  }


}
