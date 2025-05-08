import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AggregateService {
  private _aggregate_data: any = {};
  private _cube_name: string = "";

  constructor() {}

  
  set_cube_name(cube_name: string) {
    this._cube_name = cube_name;
    console.log("AggregateService - set_cube_name - _cube_name ", this._cube_name);
  }

  get cube_name() {
    return this._cube_name;
  }

  get aggregates() {
    if ((this._aggregate_data.aggregates != undefined) && (this._aggregate_data.aggregates != null)) {
      return this._aggregate_data.aggregates;
    }
    
    return [];
  }
  
  get aggregate_summary() {
    return this._aggregate_data.summary;
  }
  
  get levels() {
    return this._aggregate_data.levels;
  }
  
  get levels_list() {
    var res: any = [];
    for(var lvl_name in this._aggregate_data.levels) {
      var item = [lvl_name, this._aggregate_data.levels[lvl_name]];
      res.push(item);
    }

    return res;
  }

  get cells() {
    return this._aggregate_data.cells;
  }
  
  get attributes() {
    return this._aggregate_data.attributes;
  }
  
  get cell() {
    return this._aggregate_data.cell;
  }
  
  get total_cell_count() {
    return this._aggregate_data.total_cell_count;
  }
  
  get_summary_for_agg(agg: string): string {
    if ((this.aggregate_summary[agg] != undefined) && (this.aggregate_summary[agg] != null)) {
      return "" + this.aggregate_summary[agg];
    } else {
      return "";
    }
  }
  
  init_aggregate_data_from_endpoint(aggregate_data: any) {
    this._aggregate_data = aggregate_data;
    console.log("AggregateService - init_aggregate_data_from_endpoint - CELLS LIST LENGTH - ",this.cells.length);

  }

}
