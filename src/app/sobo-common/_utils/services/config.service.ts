import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_LOCAL_STORAGE = new InjectionToken<Storage>('Browser Local Storage', {
    providedIn: 'root',
    factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(BROWSER_LOCAL_STORAGE) private browserLocalStorage: Storage) { }

  public static get use_auth() {
    return false;
  }

}
