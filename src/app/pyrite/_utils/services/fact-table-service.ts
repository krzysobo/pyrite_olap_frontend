import { Injectable } from "@angular/core";

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
