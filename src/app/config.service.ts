import { Injectable } from '@angular/core';
import { Config } from './models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getConfig() : Config {
    return {
      baseURL: 'https://pi-identification-api-2.azurewebsites.net'
    }
  }
}