import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FactTableService } from '../../../_utils/services/fact-table-service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


class Chd extends ChangeDetectorRef {
  markForCheck(): void { }
  detach(): void { }
  detectChanges(): void { }
  checkNoChanges(): void { }
  reattach(): void { }
}


@Component({
  selector: 'app-pyrite-main-facts',
  standalone: false,
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss',
})
export class FactsComponent implements AfterViewInit {
  private _page_size = 5;
  private _page_index = 0;

  // _facts_data_source: MatTableDataSource<any> = <MatTableDataSource<any>>{};
  // https://stackoverflow.com/questions/67043781/angular-material-pagination-and-sorting-issue
  // @ViewChild(MatPaginator) facts_paginator: MatPaginator = new MatPaginator(
  // new MatPaginatorIntl(), new Chd());
  // @ViewChild(MatSort) facts_sort: MatSort = new MatSort();
  // @ViewChild(MatTable) table: MatTable<any> = <MatTable<any>>{};
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) facts_paginator: MatPaginator;
  // @ViewChild(MatSort) facts_sort: MatSort;

  constructor(private factTableService: FactTableService) {
    console.log("-- FactsComponent - init_facts_data_source in CONSTRUCTOR");
    // this._facts_data_source = new MatTableDataSource(this.factTableService.items);


    // this.init_facts_data_source([{'__fact_key__':666},{'__fact_key__':777}]);
  }


  ngAfterViewInit() {
    // this._facts_data_source.paginator = this.facts_paginator;
    // this._facts_data_source.sort = this.facts_sort;
  }

  /**
   * event handler for pagination (onPage)
   * @param evt$ 
   */
  onPage(evt$: any) { 
    console.log("---- FactsComponent - onPage ", evt$);
    // this.itemsNo = evt$.length;
    this._page_size = evt$.pageSize;
    this._page_index = evt$.pageIndex;
  }

  /**
   * event handler for sorting (matSortChange)
   * @param evt$ Object { active: "{column_name}", direction: "desc/asc" }
   */
  onSortChange(evt$: any) {
    console.log("---- FactsComponent - onSortChange ", evt$);
    this.factTableService.sort_items(evt$.active, evt$.direction);
  }

  // get facts_data_rows() {
  //   return this._facts_data_source;
  // }

  get facts_data_cols() {
    return this.factTableService.columns;
  }

  get fact_table_service(): FactTableService {
    return this.factTableService;
  }

  get items() {
    return this.factTableService.items;
  }

  get table_rows() {
    var pageStart = this._page_size * this._page_index;
    var pageEnd = (pageStart + this._page_size < this.items_length) ? pageStart + this._page_size : this.items_length;

    console.log("================================== _page_size", this._page_size, "items_length ", this.items_length, " _page_index ", this._page_index, " pagestart ", pageStart, "page end", pageEnd);
    return this.factTableService.items.slice(pageStart, pageEnd);
  }

  get items_length() {
    return this.factTableService.items.length;
  }

  get page_size() {
    return this._page_size;
  }

  get page_index() {
    return this._page_index;
  }

  init_facts_data_source(items: any) {
    // var i0 : any = [];
    // this.factTableService.init_data_source(i0);
    // this._facts_data_source = new MatTableDataSource(i0);
    console.log("--- FactsComponent - init_facts_data_source - items: ", items);
    this.factTableService.init_data_source(items);

    this.factTableService.add_items({ '__fact_key__': 'qqqq1' });
    this.factTableService.add_items({ '__fact_key__': 'qqqq2' });
    this.factTableService.add_items({ '__fact_key__': 'qqqq3' });
    this.factTableService.add_items({ '__fact_key__': 'qqqq4' });
    this.factTableService.add_items({ '__fact_key__': 'qqqq5' });

    // this._facts_data_source.data.push({'__fact_key__': 'qqqq'});

    if (this.table) {
      this.table.renderRows();
    }

    // if(this._facts_data_source.paginator) {
    //   this._facts_data_source.paginator.firstPage();
    // }

    // this._facts_data_source.data.push({'__fact_key__':'aaa'});
    // this._facts_data_source.data.push({'__fact_key__':'aaa'});
    // this._facts_data_source.data.push({'__fact_key__':'aaa'});
    // this._facts_data_source.data.push({'__fact_key__':'bbb'});
    // this._facts_data_source.data.push({'__fact_key__':'ccc'});
    // this._facts_data_source.data = [];

    // for (var item of this.factTableService.items) {
    //   this._facts_data_source.data.push(item);

    // }
    console.log("--- FactsComponent - init_facts_data_source - factTableService items: ", this.factTableService.items);
    // this._facts_data_source = new MatTableDataSource(items);
    // console.log("--- FactsComponent - init_facts_data_source - DATA: ", this._facts_data_source.data);
    // this._facts_data_source.paginator = this.facts_paginator;
    // this._facts_data_source.sort = this.facts_sort;
  }



  // init_aggregate_data_from_endpoint(aggregate_data: any) {
  //   this.aggregateService.init_aggregate_data_from_endpoint(aggregate_data);
  // }

}
