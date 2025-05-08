import { ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { CubeService } from '../_utils/services/cube-service';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';

// table imports
import { AggregatesComponent } from './sub/aggregates/aggregates.component';
import { FactsComponent } from './sub/facts/facts.component';


@Component({
  selector: 'app-pyrite-main',
  standalone: false,
  templateUrl: './pyrite-main.component.html',
  styleUrl: './pyrite-main.component.scss',
  providers: [AggregatesComponent, FactsComponent],
})
export class PyriteMainComponent implements OnInit, OnDestroy {
  private _cubes: any[] = [];
  private _expanded_cube_name: string = "";
  private _expanded_cube_model: any = null;

  constructor(
    private aggregatesComponent: AggregatesComponent,
    private factsComponent: FactsComponent,
    private cubeService: CubeService) {
  }

  get cubes_list() {
    return this._cubes;
  }

  get expanded_cube_name() {
    return this._expanded_cube_name;
  }

  get expanded_cube_model() {
    return this._expanded_cube_model;
  }

  expand_cube_info(cube_name: string) {
    var aggregate_params: any = [];
    var facts_params: any = [];

    console.log("==== EXPAND CUBE INFO: ", cube_name);
    this._expanded_cube_name = cube_name;

    this.cubeService.get_cube_model(cube_name).subscribe({
      next: (resp: any) => {
        console.log("== get_cube_model - cube model for " + cube_name, resp);
        this._expanded_cube_model = resp.body;
      },
      error: (resp) => {
        console.log("== get_cube_model - ERRORS", resp);
      },
      complete: () => { }
    });

    this.aggregatesComponent.set_cube_name(cube_name);
    this.aggregatesComponent.refresh_aggregates(aggregate_params);

    // this.cubeService.get_cube_aggregate(cube_name, aggregate_params).subscribe({
    //   next: (resp: any) => {
    //     console.log("== get_cube_aggregate - cube aggregates for " + cube_name, resp);
    //     this.aggregatesComponent.init_aggregate_data_from_endpoint(resp.body);
    //   },
    //   error: (resp) => {
    //     console.log("== get_cube_aggregate - ERRORS", resp);
    //   },
    //   complete: () => { }
    // });

    this.cubeService.get_cube_facts(cube_name, facts_params).subscribe({
      next: (resp: any) => {
        console.log("== get_cube_facts - cube facts for " + cube_name, resp);
        this.factsComponent.init_facts_data_source(resp.body);
      },
      error: (resp) => {
        console.log("== get_cube_facts - ERRORS", resp);
      },
      complete: () => { }
    });
  }

  refresh_cubes_list() {
    this.cubeService.get_cubes_list().subscribe({
      next: (resp: any) => {
        console.log("== refresh_cubes_list - cubes list:", resp);
        if ((resp.body != null) && (resp.body != undefined) && (resp.body != null)) {
          this._cubes = resp.body;

        }

      },
      error: (resp) => {
        console.log("== refresh_cubes_list - ERRORS", resp);
      },
      complete: () => { }
    });
  }


  ngOnInit() {
    this.refresh_cubes_list();
  }

  ngOnDestroy() {

  }

  get_all_cubes() {

  }

}

