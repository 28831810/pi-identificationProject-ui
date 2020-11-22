import { LoginStatus } from '../enums/login-status.enum';

export interface LoginResponse {
    message: string;
    status: LoginStatus;
}