import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { PageMode } from './enums/page-mode.enum';
import { Config } from './models/config.model';
import { Credential } from './models/credential.model';
import { LoginResponse } from './models/login-response.model';
import { SignupResponse } from './models/signup-response.model';
import { UploadResult } from './models/uploadResult.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  config!: Config;
  pageMode!: PageMode;
  selectedUpload!: UploadResult;

  constructor(private httpClient: HttpClient, private configService: ConfigService) { 
    this.config = configService.getConfig();
  }

  login(credential: Credential): Observable<LoginResponse>{
      return this.httpClient.post<LoginResponse>(`${this.config.baseURL}/login`, credential);
  }

  register(credential: Credential): Observable<SignupResponse> {
    return this.httpClient.post<SignupResponse>(`${this.config.baseURL}/signup`, credential);
  }

  getUploadResults() : Observable<UploadResult[]> {
    return this.httpClient.get<UploadResult[]>(`${this.config.baseURL}/uploads`);
  }

  updateResult(uploadResult: UploadResult): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.config.baseURL}/uploads`, uploadResult);
  }

  uploadFile(file: File) : Observable<UploadResult> {
    const formData: FormData = new FormData();
    formData.append('fileKey', file, file.name);
    return this.httpClient
      .post<UploadResult>(`${this.config.baseURL}/uploads`, formData);
  }
}
