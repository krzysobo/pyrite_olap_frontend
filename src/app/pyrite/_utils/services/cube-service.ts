import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CubesListResponse } from '../../_http/responses'
import { UniResponse } from '../../_http/uniresponse'



@Injectable({
  providedIn: 'root'
})
export class CubeService {
  private _api_prefix = 'http://localhost:5000/';
  private _api_url_system_info =  this._api_prefix + "info";
  private _api_url_system_version =  this._api_prefix + "version";

  private _api_url_cubes_list =  this._api_prefix + "cubes";
  private _api_url_cube_model =  this._api_prefix + "cube/{cube_name}/model";
  private _api_url_cube_aggregate =  this._api_prefix + "cube/{cube_name}/aggregate";
  private _api_url_cube_facts =  this._api_prefix + "cube/{cube_name}/facts";
  private _api_url_cube_fact =  this._api_prefix + "cube/{cube_name}/fact/{fact_key}";

  constructor(private http: HttpClient) { }

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

  public get_cube_aggregate(cube_name: string) {
    const url = this._api_url_cube_aggregate.replace(/{cube_name}/gi, cube_name);
    return this.http.get<HttpResponse<UniResponse>>(      
      url,
      { observe: "response"});
  }

  public get_cube_facts(cube_name: string) {
    const url = this._api_url_cube_facts.replace(/{cube_name}/gi, cube_name);
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

}
