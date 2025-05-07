import { ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { CubeService } from '../_utils/services/cube-service';
import {MatTableDataSource} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';

// table imports
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

class Chd extends ChangeDetectorRef {
  markForCheck() : void {}
  detach(): void {}
  detectChanges(): void {}
  checkNoChanges(): void {}
  reattach(): void {}
}


@Injectable({
  providedIn: 'root'
})
export class FactTableService {
  private _items: any  = [];
  private _columns: string[] = [];

  private _group_columns_labels = true;

  constructor() {}

  set group_columns_labels(state: boolean) {
    this._group_columns_labels = state;
  }

  get group_columns_labels() {
    return this._group_columns_labels;
  }

  get items() {
    return this._items;
  }

  // get data_source() {
  //   return this._facts_data_source;
  // }

  get columns() {
    return this._columns;
  }

  public init_data_source(items: any) {
    this._items = [];

    if ((items != undefined) && (items != null) && (items.length > 0)) {
      this._columns = [];

      var cols_tmp = [];

      var cols_with_labels = [];

      if (this.group_columns_labels) {
        for(var i in items[0]) {
          if (i.endsWith('_label')) { 
            var base_col = i.substring(0, i.length - 6);
            cols_with_labels.push(base_col);
            cols_tmp.push(base_col + "_dsp");
          } else if (!(i + "_label" in items[0])) {
            cols_tmp.push(i);
          }
        }
  
        console.log("cols with labels", cols_with_labels);
  
        if (cols_with_labels.length > 0) {
          for (var i in items) {
            for(var col of cols_with_labels) {
              items[i][col + "_dsp"] = items[i][col+"_label"] + " [" + items[i][col] + "]";
            }
          }
        }
      } else {
        for(var i in items[0]) {
          cols_tmp.push(i);
        }
      }
     
      
      console.log("ITEMS ", items);
      
      this._columns = cols_tmp;
      this._items = items;

      console.log("==== COLUMNS ", this._columns);

      this._items = items;
    }
  }
}


@Component({
  selector: 'app-pyrite-main',
  standalone: false,
  templateUrl: './pyrite-main.component.html',
  styleUrl: './pyrite-main.component.scss'
})
export class PyriteMainComponent implements OnInit, OnDestroy {
  // private _cubes = [];
  private _cubes: any[] = [];

  private _expanded_cube_name: string = "";
  private _expanded_cube_model: any = null;
  private _expanded_cube_aggregates: any = null;
  private _expanded_cube_facts: any = null;
  // private _expanded_cube_facts_data_source: any = null;


  _facts_data_source: MatTableDataSource<any> = <MatTableDataSource<any>>{};
  // https://stackoverflow.com/questions/67043781/angular-material-pagination-and-sorting-issue
  @ViewChild(MatPaginator) facts_paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(), new Chd());
  @ViewChild(MatSort) facts_sort: MatSort = new MatSort();

  init_facts_data_source(items: any) {
    this.factTableService.init_data_source(items);
    this._facts_data_source = new MatTableDataSource(this.factTableService.items);
    this._facts_data_source.paginator = this.facts_paginator;
    this._facts_data_source.sort = this.facts_sort;
  }

  constructor(private cubeService: CubeService, private factTableService: FactTableService) {
    this.init_facts_data_source([]);
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
      next: (resp: any)=> {
        console.log("== get_cube_model - cube model for " + cube_name, resp);
        this._expanded_cube_model = resp.body;
      },
      error: (resp) => {
        console.log("== get_cube_model - ERRORS", resp);
      },
      complete: () => {}
    });
    

    this.cubeService.get_cube_aggregate(cube_name, aggregate_params).subscribe({
      next: (resp: any)=> {
        console.log("== get_cube_aggregate - cube aggregates for " + cube_name, resp);
        this._expanded_cube_aggregates = resp.body;
      },
      error: (resp) => {
        console.log("== get_cube_aggregate - ERRORS", resp);
      },
      complete: () => {}
    });

    this.cubeService.get_cube_facts(cube_name, facts_params).subscribe({
      next: (resp: any)=> {
        console.log("== get_cube_facts - cube facts for " + cube_name, resp);
        this._expanded_cube_facts = resp.body;
        this.init_facts_data_source(this.expanded_cube_facts);
      },
      error: (resp) => {
        console.log("== get_cube_facts - ERRORS", resp);
      },
      complete: () => {}
    });
  }

  refresh_cubes_list() {
    this.cubeService.get_cubes_list().subscribe({
      next: (resp: any)=> {
        console.log("== refresh_cubes_list - cubes list:", resp);
        // console.log("AdminUserEditComponent - list - data: ", resp);
        if ((resp.body != null) && (resp.body != undefined) && (resp.body != null)) {
          this._cubes = resp.body;
         
        }

      },
      error: (resp) => {
        console.log("== refresh_cubes_list - ERRORS", resp);
      },
      complete: () => {}
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
