import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS, URL_PARAMETERS } from '@src/constants/index';
import { ShortenUrlRequest, UserUrl, UserUrlStats } from '@src/types/index';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlsService {
  constructor(private _http: HttpClient) {}

  /**
   * Request the shortening of a given URL to API
   *
   * @param body
   */
  create(body: ShortenUrlRequest): Observable<UserUrl> {
    return this._http.post<UserUrl>(this._rootPath([]), body);
  }

  /**
   * Get all current user urls
   */
  readAll(): Observable<UserUrl[]> {
    return this._http.get<UserUrl[]>(this._rootPath([]));
  }

  /**
   * Get stats information of a given URL
   *
   * @param id unique identifier or URL
   */
  readStats(id: number): Observable<UserUrlStats[]> {
    return this._http.get<UserUrlStats[]>(
      this._rootPath([
        API_ENDPOINTS.urls.stats.replace(URL_PARAMETERS.id, `${id}`),
      ])
    );
  }

  /**
   * Remove a given URL by its reference
   *
   * @param id unique identifier or URL
   */
  removeById(id: number): Observable<void> {
    return this._http.delete<void>(
      this._rootPath([
        API_ENDPOINTS.urls.id.replace(URL_PARAMETERS.id, `${id}`),
      ])
    );
  }

  private _rootPath(paths: string[]): string {
    return [environment.api, API_ENDPOINTS.urls.root, ...paths].join('/');
  }
}
