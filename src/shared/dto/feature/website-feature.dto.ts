import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class WebsiteFeatureDto {
    @IsUUID()
    @IsNotEmpty()
    websiteId: string;

    @IsString()
    @IsNotEmpty()
    featureName: string;

    @IsBoolean()
    @IsNotEmpty()
    isEnabled: boolean;

    @IsObject()
    @IsOptional()
    configuration?: Record<string, any>;
}
