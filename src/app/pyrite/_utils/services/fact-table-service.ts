import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FactTableService {
  private _items: any = [];
  private _columns: string[] = [];

  private _group_columns_labels = true;

  constructor() { }

  set group_columns_labels(state: boolean) {
    this._group_columns_labels = state;
  }

  get group_columns_labels() {
    return this._group_columns_labels;
  }

  get items() {
    return this._items;
  }

  sort_items(col: string, direction: string) {
    console.log("FactTableService - sort_items - BEFORE ", this._items);
    var sorted_items = this._items.sort((n1: any, n2: any) => {
      if (direction == 'asc') {
        if (n1[col] > n2[col]) {
          return 1;
        } else if (n1[col] < n2[col]) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (n1[col] < n2[col]) {
          return 1;
        } else if (n1[col] > n2[col]) {
          return -1;
        } else {
          return 0;
        }

      }
    });
    this._items = sorted_items;
    console.log("FactTableService - sort_items - AFTER ", this._items);
    // var sortedArray: { age: number; }[] = objectArray.sort((n1,n2) => {
    //     if (n1.age > n2.age) {
    //         return 1;
    //     }

    //     if (n1.age < n2.age) {
    //         return -1;
    //     }

    //     return 0;
    // });
  }

  add_items(items: any) {
    this._items.push(items);
  }

  get columns() {
    return this._columns;
  }

  public init_data_source(items: any) {
    console.log("-- FactTableService - init_data_source - ITEMS_IN ", items);
    this._items = [];

    if ((items == undefined) || (items == null) || (items.length < 1)) {
      return;
    }

    this._columns = [];
    var cols_tmp = [];
    var cols_with_labels = [];

    if (this.group_columns_labels) {
      for (var i in items[0]) {
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
          for (var col of cols_with_labels) {
            items[i][col + "_dsp"] = items[i][col + "_label"] + " [" + items[i][col] + "]";
          }
        }
      }
    } else {
      for (var i in items[0]) {
        cols_tmp.push(i);
      }
    }


    console.log("-- FactTableService - init_data_source - ITEMS_OUT ", items);

    this._columns = cols_tmp;

    // for(var item of items) {
    //   this._items.push(item);
    // }
    this._items = items;

    console.log("==== COLUMNS ", this._columns);

    this._items = items;
  }
}
