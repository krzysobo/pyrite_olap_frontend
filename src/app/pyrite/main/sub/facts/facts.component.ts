import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FactTableService } from '../../../_utils/services/fact-table-service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-pyrite-main-facts',
  standalone: false,
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.scss',
})
export class FactsComponent implements AfterViewInit {
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  constructor(private factTableService: FactTableService) {

  }

  ngAfterViewInit() { }

  /**
   * event handler for pagination (onPage)
   * @param evt$ 
   */
  onPage(evt$: any) { 
    console.log("---- FactsComponent - onPage ", evt$);
    // this.itemsNo = evt$.length;
    this.factTableService.page_size = evt$.pageSize;
    this.factTableService.page_index = evt$.pageIndex;
  }

  /**
   * event handler for sorting (matSortChange)
   * @param evt$ Object { active: "{column_name}", direction: "desc/asc" }
   */
  onSortChange(evt$: any) {
    console.log("---- FactsComponent - onSortChange ", evt$);
    this.factTableService.sort_items(evt$.active, evt$.direction);
  }

  get facts_data_cols() {
    return this.factTableService.columns;
  }

  get fact_table_service(): FactTableService {
    return this.factTableService;
  }

  get table_rows() {
    return this.factTableService.table_rows;
  }

  get items_length() {
    return this.factTableService.items.length;
  }

  get page_size() {
    return this.factTableService.page_size;
  }

  get page_index() {
    return this.factTableService.page_index;
  }

  init_facts_data_source(items: any) {
    console.log("--- FactsComponent - init_facts_data_source - items: ", items);
    this.factTableService.init_data_source(items);

    if (this.table) {
      this.table.renderRows();
    }

    console.log("--- FactsComponent - init_facts_data_source - factTableService items: ", this.factTableService.items);
  }

}
