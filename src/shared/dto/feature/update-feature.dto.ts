import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateFeatureDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsBoolean()
    @IsOptional()
    isGloballyAvailable?: boolean;
}
