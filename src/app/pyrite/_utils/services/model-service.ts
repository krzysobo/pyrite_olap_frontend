import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private _cube_name: string = "";
  private _model_data: any = {};

  constructor() { }

  set_cube_name(cube_name: string) {
    this._cube_name = cube_name;
    console.log("ModelService - set_cube_name - _cube_name ", this._cube_name);
  }

  set_model_data(model_data: any) {
    this._model_data = model_data;
    console.log("ModelService - set_model_data - _model_data ", this._model_data);
  }

  get cube_name() {
    return this._cube_name;
  }

  get model_data() {
    return this._model_data;
  }


  get model_name() {
    return this._model_data.name;
  }

  get model_info() {
    return this._model_data.info;
  }

  get model_label() {
    return this._model_data.label;
  }

  get model_aggregates() {
    return this._model_data.aggregates;
  }

  get model_measures() {
    return this._model_data.measures;
  }

  get model_details() {
    return this._model_data.details;
  }

  get model_dimensions(): any {
    return this._model_data.dimensions;
  }

  get model_features() {
    return this._model_data.features;
  }


}
