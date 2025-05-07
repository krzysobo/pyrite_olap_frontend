import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AggregateService {
  private _aggregate_data: any;

  constructor() {}

  get aggregates() {
    return this._aggregate_data.aggregates;
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

  init_aggregate_data_from_endpoint(aggregate_data: any) {
    this._aggregate_data = aggregate_data;

  }

}
