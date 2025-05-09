import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AggregateService } from '../../../_utils/services/aggregate-service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpCubeService } from '../../../_http/cube-service';
import { TableService } from '../../../_utils/services/table-service';
import { MatTable } from '@angular/material/table';
import { ModelService } from '../../../_utils/services/model-service';

@Component({
  selector: 'app-pyrite-main-model',
  standalone: false,
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss',
  providers: [TableService],
})
export class ModelComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    agg_query: new FormControl(''),
  }, {});

  // @ViewChild(MatTable) tableResultCells: MatTable<any> | undefined;
  // @ViewChild(MatTable) tableResultCellCuts: MatTable<any> | undefined;
  // private resultCellsTableService: TableService = new TableService();
  // private resultCellCutsTableService: TableService = new TableService();

  private _aggregate_query_error: string = "";

  constructor(
    // private aggregateService: AggregateService,
    private modelService: ModelService,
    private httpCubeService: HttpCubeService,
  ) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void { }

  get model_service(): ModelService {
    return this.modelService;
  }

  set_cube_name(cube_name: string) {
    this.modelService.set_cube_name(cube_name);
    console.log("ModelComponent - set_cube_name - _cube_name ", this.modelService.cube_name);
  }

  set_model_data(model_data: any) {
    this.modelService.set_model_data(model_data);
  }

}
