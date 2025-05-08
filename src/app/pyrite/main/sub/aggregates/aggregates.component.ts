import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AggregateService } from '../../../_utils/services/aggregate-service';
import { FormControl, FormGroup } from '@angular/forms';
import { CubeService } from '../../../_utils/services/cube-service';

@Component({
  selector: 'app-pyrite-main-aggregates',
  standalone: false,
  templateUrl: './aggregates.component.html',
  styleUrl: './aggregates.component.scss',
})
export class AggregatesComponent implements OnInit, OnDestroy {
form: FormGroup = new FormGroup({
    agg_query: new FormControl(''),
  }, {});

  constructor(
    private aggregateService: AggregateService, 
    private cubeService: CubeService) {

  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {}

  get aggregate_service(): AggregateService {
    return this.aggregateService;
  }

  set_cube_name(cube_name: string) {
    this.aggregateService.set_cube_name(cube_name);
    console.log("Aggregates - set_cube_name - _cube_name ", this.aggregateService.cube_name);
  }

  refresh_aggregates(aggregate_params: any) {
    console.log("---- Refresh aggregates - cube name: ", this.aggregateService.cube_name);
    this.cubeService.get_cube_aggregate(this.aggregateService.cube_name, aggregate_params).subscribe({
      next: (resp: any) => {
        console.log("== get_cube_aggregate - cube aggregates for " + this.aggregateService.cube_name, resp);
        this.init_aggregate_data_from_endpoint(resp.body);
      },
      error: (resp) => {
        console.log("== get_cube_aggregate - ERRORS", resp);
      },
      complete: () => { }
    });
    
  }

  submit_query_form() {
    console.log("--- submit query form");
    const agg_query = this.form.controls['agg_query'].value;
    console.log("--- submit query form - query: ", agg_query);
    this.refresh_aggregates(agg_query.split("&"));
  }  

  init_aggregate_data_from_endpoint(aggregate_data: any) {
    this.aggregateService.init_aggregate_data_from_endpoint(aggregate_data);
  }

}
