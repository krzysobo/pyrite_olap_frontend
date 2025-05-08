import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CubesListResponse } from './responses'
import { UniResponse } from './uniresponse'



@Injectable({
  providedIn: 'root'
})
export class HttpCubeService {
  private _api_prefix = 'http://localhost:5000/';
  private _api_url_system_info =  this._api_prefix + "info";
  private _api_url_system_version =  this._api_prefix + "version";

  private _api_url_cubes_list =  this._api_prefix + "cubes";
  private _api_url_cube_model =  this._api_prefix + "cube/{cube_name}/model";
  private _api_url_cube_aggregate =  this._api_prefix + "cube/{cube_name}/aggregate";
  private _api_url_cube_facts =  this._api_prefix + "cube/{cube_name}/facts";
  private _api_url_cube_fact =  this._api_prefix + "cube/{cube_name}/fact/{fact_key}";
  private _api_url_cube_dim_members =  this._api_prefix + "cube/{cube_name}/members/{dim_name}";
  private _api_url_cube_cell =  this._api_prefix + "cube/{cube_name}/cell";

  constructor(private http: HttpClient) { }

  private add_param_list_if_not_empty(param_list: []) {
    if ((param_list != undefined) && (param_list != null) && (param_list.length > 0)) {
      return "?" + param_list.join("&");
    } else {
      return "";
    }
  }


  public get_cubes_list() {
    const url = this._api_url_cubes_list;
    return this.http.get<HttpResponse<CubesListResponse>>(      
      url,
      { observe: "response"});
   
  }

  public get_system_version() {
    const url = this._api_url_system_version;
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
   
  }
  public get_system_info() {
    const url = this._api_url_system_info;
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
   
  }

  public get_cube_model(cube_name: string) {
    const url = this._api_url_cube_model.replace(/{cube_name}/gi, cube_name);
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
   
  }

  public get_cube_aggregate(cube_name: string, param_list: [] = []) {
    /**
     * parameters on param_list:
     *    https://pythonhosted.org/cubes/server.html#aggregate : 
        cut - specification of cell, for example: cut=date:2004,1|category:2|entity:12345
        drilldown - dimension to be drilled down. For example drilldown=date will give rows for each value of next level of dimension date. You can explicitly specify level to drill down in form: dimension:level, such as: drilldown=date:month. To specify a hierarchy use dimension@hierarchy as in drilldown=date@ywd for implicit level or drilldown=date@ywd:week to explicitly specify level.
        aggregates – list of aggregates to be computed, separated by |, for example: aggergates=amount_sum|discount_avg|count
        measures – list of measures for which their respecive aggregates will be computed (see below). Separated by |, for example: aggergates=proce|discount
        page - page number for paginated results
        pagesize - size of a page for paginated results
        order - list of attributes to be ordered by
        split – split cell, same syntax as the cut, defines virtual binary (flag) dimension that inticates whether a cell belongs to the split cut (true) or not (false). The dimension attribute is called __within_split__. Consult the backend you are using for more information, whether this feature is supported or not.

     */
    var url = this._api_url_cube_aggregate.replace(/{cube_name}/gi, cube_name) + this.add_param_list_if_not_empty(param_list);
    console.log("HttpCubeService - get_cube_aggregate URL: ", url);

    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
  }

  public get_cube_facts(cube_name: string, param_list: [] = []) {
    /**
     * Parameters:
          https://pythonhosted.org/cubes/server.html#facts
        cut - see /aggregate
        page, pagesize - paginate results
        order - order results
        format - result format: json (default; see note below), csv or json_lines.
        fields - comma separated list of fact fields, by default all fields are returned
        header – specify what kind of headers should be present in the csv output: names – raw field names (default), labels – human readable labels or none

     */    
    const url = this._api_url_cube_facts.replace(/{cube_name}/gi, cube_name) + this.add_param_list_if_not_empty(param_list);
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
   
  }

  public get_cube_dim_members(cube_name: string, dim_name: string, param_list: [] = []) {
    const url = this._api_url_cube_dim_members
        .replace(/{cube_name}/gi, cube_name)
        .replace(/{dim_name}/gi, dim_name) + this.add_param_list_if_not_empty(param_list);
    /**
     * Parameters:
          https://pythonhosted.org/cubes/server.html#dimension-members
        cut - see /aggregate
        depth - specify depth (number of levels) to retrieve. If not
            specified, then all levels are returned. Use this or level.
        level - deepest level to be retrieved – use this or depth.
        hierarchy – name of hierarchy to be considered, if not specified, then
            dimension’s default hierarchy is used
        page, pagesize - paginate results
        order - order results
     *  */        
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
   
  }

  public get_cube_fact(cube_name: string, fact_key: string) {
    const url = this._api_url_cube_fact
        .replace(/{cube_name}/gi, cube_name)
        .replace(/{fact_key}/gi, fact_key);
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
   
  }

  public get_cube_cell(cube_name: string, param_list: [] = []) {
    /**
     * Parameters:
          https://pythonhosted.org/cubes/server.html#cell
        cut - see /aggregate
     */    
    const url = this._api_url_cube_cell.replace(/{cube_name}/gi, cube_name) + this.add_param_list_if_not_empty(param_list);
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
   
  }



}
