import { Inject, Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../app-injection-tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    public httpClient: HttpClient,
    @Inject(BACKEND_API_URL) private uriBase: string
  ) {}

  public get(uri: string, query?: any): Observable<Object> //guid?: string,
  {
    var params = new HttpParams();

    if (query !== undefined) {
      let queryKeys = Object.keys(query);
      for (const key of queryKeys) {
        if (query[key] == null) {
          continue;
        }
        params = params.append(key, query[key]);
      }
    }

/*     if (guid != undefined && guid != '' && guid != null) {
      return this.httpClient.get(this.uriBase.concat(uri).concat('/' + guid), {
        params: params,
      });
    } */

    return this.httpClient.get(this.uriBase.concat(uri), { params: params });
  }

  public post(uri: string, entity: any) {
    return this.httpClient.post(this.uriBase.concat(uri), entity);
  }

  public put(uri: string, entity: any): Observable<any>;
  public put(uri: string, entity: any, guid: string): Observable<any>;
  public put(uri: string, entity: any, guid?: string): Observable<any> {
    if (uri === undefined) {
      return of({});
    }

    var guidstr = guid === undefined ? '' : '/'.concat(guid);
    return this.httpClient.put(
      this.uriBase.concat(uri).concat(guidstr),
      entity
    );
  }

  public delete(uri: string, guid?: string) {
    var params = new HttpParams();
    if (guid != undefined && guid != '' && guid != null) {
      return this.httpClient.delete(
        this.uriBase.concat(uri).concat('/' + guid),
        { params: params }
      );
    }

    return this.httpClient.delete(this.uriBase.concat(uri), { params: params });
  }
}
