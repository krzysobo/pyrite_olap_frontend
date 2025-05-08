import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FactTableService {
  private _items: any = [];
  private _columns: string[] = [];

  private _group_columns_labels = true;

  private _page_size = 5;
  private _page_index = 0;

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

  get items_length() {
    return this.items.length;
  }

  get page_size() {
    return this._page_size;
  }

  get page_index() {
    return this._page_index;
  }

  set page_size(val: number) {
    this._page_size = val;
  }

  set page_index(val: number) {
    this._page_index = val;
  }

  get table_rows() {
    var pageStart = this._page_size * this._page_index;
    var pageEnd = (pageStart + this._page_size < this.items_length) ? pageStart + this._page_size : this.items_length;

    console.log("================================== _page_size", this._page_size, "items_length ", this.items_length, " _page_index ", this._page_index, " pagestart ", pageStart, "page end", pageEnd);
    return this.items.slice(pageStart, pageEnd);
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
    // this._items = items;
    console.log("==== COLUMNS ", this._columns);

    this._items = items;
  }
}
