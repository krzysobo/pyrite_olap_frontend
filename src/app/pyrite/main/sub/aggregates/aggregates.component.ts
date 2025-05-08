import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AggregateService } from '../../../_utils/services/aggregate-service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpCubeService } from '../../../_http/cube-service';
import { TableService } from '../../../_utils/services/table-service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-pyrite-main-aggregates',
  standalone: false,
  templateUrl: './aggregates.component.html',
  styleUrl: './aggregates.component.scss',
})
export class AggregatesComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    agg_query: new FormControl(''),
  }, {});

  @ViewChild(MatTable) table: MatTable<any> | undefined;


  constructor(
    private aggregateService: AggregateService,
    private httpCubeService: HttpCubeService,
    private tableService: TableService) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void { }

  get aggregate_service(): AggregateService {
    return this.aggregateService;
  }


  set_cube_name(cube_name: string) {
    this.aggregateService.set_cube_name(cube_name);
    console.log("Aggregates - set_cube_name - _cube_name ", this.aggregateService.cube_name);
  }

  refresh_aggregates(aggregate_params: any) {
    console.log("---- Refresh aggregates - cube name: ", this.aggregateService.cube_name);
    this.httpCubeService.get_cube_aggregate(this.aggregateService.cube_name, aggregate_params).subscribe({
      next: (resp: any) => {
        console.log("== get_cube_aggregate - cube aggregates for " + this.aggregateService.cube_name, resp);
        this.init_aggregate_data_from_endpoint(resp.body);
      },
      error: (resp: any) => {
        console.log("== get_cube_aggregate - ERRORS", resp);
      },
      complete: () => { }
    });

  }

  submit_query_form() {
    console.log("--- submit query form");
    const agg_query = this.form.controls['agg_query'].value;
    console.log("--- submit query form - query: ", agg_query);
    this.refresh_aggregates(agg_query.split("&"));
  }

  init_aggregate_data_from_endpoint(aggregate_data: any) {
    this.aggregateService.init_aggregate_data_from_endpoint(aggregate_data);
    this.tableService.init_data_source(this.aggregateService.cells);
    if (this.table) {
      this.table.renderRows();
    }
  }



  // ================== TABLE =====================
  /**
 * event handler for pagination (onPage)
 * @param evt$ 
 */
  onCellsPage(evt$: any) {
    console.log("---- onCellsPage - onPage ", evt$);
    // this.itemsNo = evt$.length;
    this.tableService.page_size = evt$.pageSize;
    this.tableService.page_index = evt$.pageIndex;
  }

  /**
   * event handler for sorting (matSortChange)
   * @param evt$ Object { active: "{column_name}", direction: "desc/asc" }
   */
  onCellsSortChange(evt$: any) {
    console.log("---- onCellsSortChange - onSortChange ", evt$);
    this.tableService.sort_items(evt$.active, evt$.direction);
  }

  get cells_data_cols() {
    return this.tableService.columns;
  }

  get cells_page_size() {
    return this.tableService.page_size;
  }

  get cells_table_rows() {
    // // console.log("CELLS LIST LENGTH - aggregateService: ", this.aggregateService.cells.length, "tableService: ",
    //   this.tableService.items.length);
    return this.tableService.table_rows;
  }

  get cells_total_length() {
    return this.tableService.items_length;
  }
}
