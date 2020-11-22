import { Filetype } from '../enums/filetype.enum';
import { Metadata } from './metadata.model';

export interface UploadResult {
    id: number;
    name: string;
    type: Filetype;
    metadata: Metadata[]
}