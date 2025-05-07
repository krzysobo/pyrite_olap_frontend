import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AggregateService {
  private _aggregate_data: any = {};

  constructor() {}

  
  
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
  }

}
