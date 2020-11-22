import { SignupStatus } from '../enums/signup-status.enum';

export interface SignupResponse {
    message: string;
    status: SignupStatus;
    apiKey: string;
}