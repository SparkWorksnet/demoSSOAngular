import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ResourceDTO} from 'sparkworks-cargo-client';

declare var $: any;

@Component({
  selector: 'app-resources-table',
  templateUrl: './resources-table.component.html',
  styleUrls: ['./resources-table.component.css']
})
export class ResourcesTableComponent implements OnInit, OnChanges {

  @Input()
  resources: Array<ResourceDTO> = [];

  @Input()
  visibility: any = {
    uuid: true,
    userFriendlyName: true,
    systemName: true,
    groupUuid: true
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
    if (changes.resources.currentValue !== changes.resources.previousValue && !changes.resources.isFirstChange()) {
      this.refreshDatatable();
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.innerDtTrigger.unsubscribe();
  }


}
