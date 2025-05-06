import { Component, OnDestroy, OnInit } from '@angular/core';
import { CubeService } from '../_utils/services/cube-service';

@Component({
  selector: 'app-pyrite-main',
  standalone: false,
  templateUrl: './pyrite-main.component.html',
  styleUrl: './pyrite-main.component.scss'
})
export class PyriteMainComponent implements OnInit, OnDestroy {
  // private _cubes = [];
  private _cubes: any[] = [];

  private _expanded_cube_name: string = "";

  constructor(private cubeService: CubeService) {}

  get cubes_list() {
    return this._cubes;
  }

  get expanded_cube_name() {
    return this._expanded_cube_name;
  }

  expand_cube_info(cube_name: string) {
    console.log("==== EXPAND CUBE INFO: ", cube_name);
    this._expanded_cube_name = cube_name;

    this.cubeService.get_cube_model(cube_name).subscribe({
      next: (resp: any)=> {
        console.log("cube model for " + cube_name, resp);
      },
      error: (resp) => {
        console.log("get_cube_model - ERRORS", resp);
      },
      complete: () => {}
    });

    this.cubeService.get_cube_aggregate(cube_name).subscribe({
      next: (resp: any)=> {
        console.log("cube aggregate for " + cube_name, resp);
      },
      error: (resp) => {
        console.log("get_cube_aggregate - ERRORS", resp);
      },
      complete: () => {}
    });
  }

  refresh_cubes_list() {
    this.cubeService.get_cubes_list().subscribe({
      next: (resp: any)=> {
        console.log("refresh cubes list", resp);
        // console.log("AdminUserEditComponent - list - data: ", resp);
        if ((resp.body != null) && (resp.body != undefined) && (resp.body != null)) {
          this._cubes = resp.body;
         
        }

      },
      error: (resp) => {
        console.log("refresh cubes list - ERRORS", resp);
      },
      complete: () => {}
    });
  }


  ngOnInit() {
    this.refresh_cubes_list();
  }

  ngOnDestroy() {
    
  }

  get_all_cubes() {
    
  }


  // ngOn
  // this._profile = this.userStateService.get_current_user();

}
