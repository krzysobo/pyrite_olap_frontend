import { ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { CubeService } from '../_utils/services/cube-service';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';

// table imports
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FactTableService } from '../_utils/services/fact-table-service';
import { AggregateService } from '../_utils/services/aggregate-service';

class Chd extends ChangeDetectorRef {
  markForCheck(): void { }
  detach(): void { }
  detectChanges(): void { }
  checkNoChanges(): void { }
  reattach(): void { }
}




@Component({
  selector: 'app-pyrite-main',
  standalone: false,
  templateUrl: './pyrite-main.component.html',
  styleUrl: './pyrite-main.component.scss'
})
export class PyriteMainComponent implements OnInit, OnDestroy {
  private _cubes: any[] = [];
  private _expanded_cube_name: string = "";
  private _expanded_cube_model: any = null;
  private _expanded_cube_aggregates: any = null;
  private _expanded_cube_facts: any = null;
  _facts_data_source: MatTableDataSource<any> = <MatTableDataSource<any>>{};
  // https://stackoverflow.com/questions/67043781/angular-material-pagination-and-sorting-issue
  @ViewChild(MatPaginator) facts_paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(), new Chd());
  @ViewChild(MatSort) facts_sort: MatSort = new MatSort();


  constructor(
    private cubeService: CubeService,
    private factTableService: FactTableService,
    private aggregateService: AggregateService) {
    this.init_facts_data_source([]);
  }


  init_facts_data_source(items: any) {
    this.factTableService.init_data_source(items);
    this._facts_data_source = new MatTableDataSource(this.factTableService.items);
    this._facts_data_source.paginator = this.facts_paginator;
    this._facts_data_source.sort = this.facts_sort;
  }

  get cubes_list() {
    return this._cubes;
  }

  get expanded_cube_name() {
    return this._expanded_cube_name;
  }

  get expanded_cube_model() {
    return this._expanded_cube_model;
  }

  get expanded_cube_aggregates() {
    return this._expanded_cube_aggregates;
  }

  get expanded_cube_facts() {
    return this._expanded_cube_facts;
  }

  get facts_data_rows() {
    return this._facts_data_source;
  }

  get facts_data_cols() {
    return this.factTableService.columns;
  }


  expand_cube_info(cube_name: string) {
    var aggregate_params: any = [];
    var facts_params: any = [];

    console.log("==== EXPAND CUBE INFO: ", cube_name);
    this._expanded_cube_name = cube_name;

    this.cubeService.get_cube_model(cube_name).subscribe({
      next: (resp: any) => {
        console.log("== get_cube_model - cube model for " + cube_name, resp);
        this._expanded_cube_model = resp.body;
      },
      error: (resp) => {
        console.log("== get_cube_model - ERRORS", resp);
      },
      complete: () => { }
    });


    this.cubeService.get_cube_aggregate(cube_name, aggregate_params).subscribe({
      next: (resp: any) => {
        console.log("== get_cube_aggregate - cube aggregates for " + cube_name, resp);
        this._expanded_cube_aggregates = resp.body;
        this.aggregateService.init_aggregate_data_from_endpoint(this._expanded_cube_aggregates);
      },
      error: (resp) => {
        console.log("== get_cube_aggregate - ERRORS", resp);
      },
      complete: () => { }
    });

    this.cubeService.get_cube_facts(cube_name, facts_params).subscribe({
      next: (resp: any) => {
        console.log("== get_cube_facts - cube facts for " + cube_name, resp);
        this._expanded_cube_facts = resp.body;
        this.init_facts_data_source(this._expanded_cube_facts);
      },
      error: (resp) => {
        console.log("== get_cube_facts - ERRORS", resp);
      },
      complete: () => { }
    });
  }

  refresh_cubes_list() {
    this.cubeService.get_cubes_list().subscribe({
      next: (resp: any) => {
        console.log("== refresh_cubes_list - cubes list:", resp);
        // console.log("AdminUserEditComponent - list - data: ", resp);
        if ((resp.body != null) && (resp.body != undefined) && (resp.body != null)) {
          this._cubes = resp.body;

        }

      },
      error: (resp) => {
        console.log("== refresh_cubes_list - ERRORS", resp);
      },
      complete: () => { }
    });
  }


  ngOnInit() {
    this.refresh_cubes_list();
  }

  ngOnDestroy() {

  }

  get_all_cubes() {

  }


  // ngOn
  // this._profile = this.userStateService.get_current_user();

}
