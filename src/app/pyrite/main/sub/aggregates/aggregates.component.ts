import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AggregateService } from '../../../_utils/services/aggregate-service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpCubeService } from '../../../_http/cube-service';
import { TableService } from '../../../_utils/services/table-service';
import { MatTable } from '@angular/material/table';
import { ModelService } from '../../../_utils/services/model-service';

@Component({
  selector: 'app-pyrite-main-aggregates',
  standalone: false,
  templateUrl: './aggregates.component.html',
  styleUrl: './aggregates.component.scss',
  providers: [TableService],
})
export class AggregatesComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    agg_query: new FormControl(''),
  }, {});

  private resultCellsTableService: TableService = new TableService();
  private resultCellCutsTableService: TableService = new TableService();

  private _aggregate_query_error: string = "";

  constructor(
    private aggregateService: AggregateService,
    private modelService: ModelService,
    private httpCubeService: HttpCubeService,
  ) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void { }

  get aggregate_service(): AggregateService {
    return this.aggregateService;
  }

  get model_service(): ModelService {
    return this.modelService;
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
        this._aggregate_query_error = "";
      },
      error: (resp: any) => {
        console.log("== get_cube_aggregate - ERRORS", resp);
        /*
          {
              "error": "missing_object",
              "message": "cube 'irbd_balance' has no dimension 'blah'",
              "object": null,
              "object_type": "dimension"
          }
        */
        this._aggregate_query_error = "[" + resp.error.error + "] - " + resp.error.message;
      },
      complete: () => { }
    });

  }

  submit_query_form() {
    console.log("--- submit query form");
    const agg_query = this.form.controls['agg_query'].value;
    console.log("--- submit query form - query: ", agg_query);
    this.resultCellsTableService.page_index = 0;
    this.resultCellCutsTableService.page_index = 0;

    this.resultCellsTableService.page_size = 5;
    this.resultCellCutsTableService.page_size = 5;

    this.refresh_aggregates(agg_query.split("&"));
  }

  init_aggregate_data_from_endpoint(aggregate_data: any) {
    this.aggregateService.init_aggregate_data_from_endpoint(aggregate_data);

    this.resultCellsTableService.init_data_source(this.aggregateService.cells);
    this.resultCellCutsTableService.init_data_source(this.aggregateService.cell);
  }

  get aggregate_query_error() {
    return this._aggregate_query_error;
  }

  // ================== TABLE =====================
  /**
  * event handler for pagination (onPage)
  * @param evt$ 
  */
  onCellsPage(evt$: any) {
    console.log("---- onCellsPage - onPage ", evt$);
    // this.itemsNo = evt$.length;
    this.resultCellsTableService.page_size = evt$.pageSize;
    this.resultCellsTableService.page_index = evt$.pageIndex;
  }

  /**
   * event handler for sorting (matSortChange)
   * @param evt$ Object { active: "{column_name}", direction: "desc/asc" }
   */
  onCellsSortChange(evt$: any) {
    console.log("---- onCellsSortChange - onSortChange ", evt$);
    this.resultCellsTableService.sort_items(evt$.active, evt$.direction);
  }

  get cells_data_cols() {
    return this.resultCellsTableService.columns;
  }

  get cells_table_rows() {
    return this.resultCellsTableService.table_rows;
  }

  get cells_page_size() {
    return this.resultCellsTableService.page_size;
  }

  get cells_page_index() {
    return this.resultCellsTableService.page_index;
  }


  get cells_total_length() {
    return this.resultCellsTableService.items_length;
  }

  // --- cell cuts ---
  onCellCutsPage(evt$: any) {
    console.log("---- onCellCutsPage - onPage ", evt$);
    // this.itemsNo = evt$.length;
    this.resultCellsTableService.page_size = evt$.pageSize;
    this.resultCellsTableService.page_index = evt$.pageIndex;
  }

  onCellCutsSortChange(evt$: any) {
    console.log("---- onCellCutsSortChange - onSortChange ", evt$);
    this.resultCellCutsTableService.sort_items(evt$.active, evt$.direction);
  }

  get cell_cuts_data_cols() {
    return this.resultCellCutsTableService.columns;
  }

  get cell_cuts_table_rows() {
    return this.resultCellCutsTableService.table_rows;
  }

  get cell_cuts_page_size() {
    return this.resultCellCutsTableService.page_size;
  }

  get cell_cuts_page_index() {
    return this.resultCellCutsTableService.page_index;
  }

  get cell_cuts_total_length() {
    return this.resultCellCutsTableService.items_length;
  }

}
