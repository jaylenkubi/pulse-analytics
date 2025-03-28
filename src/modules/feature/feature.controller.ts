import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from '../../shared/dto/feature/create-feature.dto';
import { UpdateFeatureDto } from '../../shared/dto/feature/update-feature.dto';
import { WebsiteFeatureDto } from '../../shared/dto/feature/website-feature.dto';
import { AccessLevelFeatureDto } from '../../shared/dto/feature/access-level-feature.dto';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { Role } from '@modules/auth/enums/roles.enum';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { SwaggerRoute } from '../../shared/decorators/swagger.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FeatureResponseDto } from '../../shared/dto/feature/feature-response.dto';
import { WebsiteFeatureResponseDto } from '../../shared/dto/feature/website-feature-response.dto';
import { AccessLevelFeatureResponseDto } from '../../shared/dto/feature/access-level-feature-response.dto';

@ApiTags('Features')
@ApiBearerAuth('JWT')
@Controller('features')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FeatureController {
    constructor(private readonly featureService: FeatureService) {}

    @Post()
    @Roles(Role.ADMIN)
    @SwaggerRoute({
        summary: 'Create a new feature',
        operationId: 'createFeature',
        bodyType: CreateFeatureDto,
        responseType: FeatureResponseDto,
        status: 201,
        description: 'Creates a new feature in the system. Admin access required.'
    })
    async createFeature(@Body() createFeatureDto: CreateFeatureDto): Promise<FeatureResponseDto> {
        return this.featureService.createFeature(createFeatureDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    @SwaggerRoute({
        summary: 'Get all features',
        operationId: 'getAllFeatures',
        responseType: [FeatureResponseDto],
        description: 'Retrieves all features in the system. Admin access required.'
    })
    async getAllFeatures(): Promise<FeatureResponseDto[]> {
        return this.featureService.getAllFeatures();
    }
    
    @Get('website/:websiteId')
    @Roles(Role.ADMIN)
    @SwaggerRoute({
        summary: 'Get all features by websiteId',
        operationId: 'getAllFeaturesByWebsiteId',
        responseType: [FeatureResponseDto],
        description: 'Retrieves all features for a specific website. Admin access required.',
        params: {
            websiteId: {
                type: 'string',
                required: true
            }
        }
    })
    async getAllFeaturesByWebsiteId(@Param('websiteId') websiteId: string): Promise<FeatureResponseDto[]> {
        return this.featureService.getAllFeaturesByWebsiteId(websiteId);
    }

    @Get('name/:name')
    @Roles(Role.ADMIN)
    @SwaggerRoute({
        summary: 'Get a feature by name',
        operationId: 'getFeatureByName',
        responseType: FeatureResponseDto,
        description: 'Retrieves a feature by its name. Admin access required.',
        params: {
            name: {
                type: 'string',
                required: true
            }
        }
    })
    async getFeatureByName(@Param('name') name: string): Promise<FeatureResponseDto> {
        return this.featureService.getFeatureByName(name);
    }

    @Put('name/:name')
    @Roles(Role.ADMIN)
    @SwaggerRoute({
        summary: 'Update a feature',
        operationId: 'updateFeature',
        bodyType: UpdateFeatureDto,
        responseType: FeatureResponseDto,
        description: 'Updates an existing feature by name. Admin access required.',
        params: {
            name: {
                type: 'string',
                required: true
            }
        }
    })
    async updateFeature(
        @Param('name') name: string,
        @Body() updateFeatureDto: UpdateFeatureDto
    ): Promise<FeatureResponseDto> {
        return this.featureService.updateFeature(name, updateFeatureDto);
    }

    @Delete('name/:name')
    @Roles(Role.ADMIN)
    @SwaggerRoute({
        summary: 'Delete a feature',
        operationId: 'deleteFeature',
        status: 204,
        description: 'Deletes a feature by name. Admin access required.',
        params: {
            name: {
                type: 'string',
                required: true
            }
        }
    })
    async deleteFeature(@Param('name') name: string): Promise<void> {
        return this.featureService.deleteFeature(name);
    }

    @Post('website')
    @Roles(Role.ADMIN, Role.USER)
    @SwaggerRoute({
        summary: 'Enable/Configure a feature for a website',
        operationId: 'enableFeatureForWebsite',
        bodyType: WebsiteFeatureDto,
        responseType: WebsiteFeatureResponseDto,
        status: 201,
        description: 'Enables and configures a feature for a specific website. Admin or website owner access required.'
    })
    async enableFeatureForWebsite(@Body() websiteFeatureDto: WebsiteFeatureDto): Promise<WebsiteFeatureResponseDto | number | null> {
        return this.featureService.enableFeatureForWebsite(websiteFeatureDto);
    }

    @Get('website/:websiteId/features')
    @Roles(Role.ADMIN, Role.USER)
    @SwaggerRoute({
        summary: 'Get features for a website',
        operationId: 'getWebsiteFeatures',
        responseType: [WebsiteFeatureResponseDto],
        description: 'Retrieves all features configured for a specific website. Admin or website owner access required.',
        params: {
            websiteId: {
                type: 'string',
                required: true
            }
        }
    })
    async getWebsiteFeatures(@Param('websiteId') websiteId: string): Promise<WebsiteFeatureResponseDto[]> {
        return this.featureService.getWebsiteFeatures(websiteId);
    }

    @Post('access-level')
    @Roles(Role.ADMIN, Role.USER)
    @SwaggerRoute({
        summary: 'Set access level permissions for a feature',
        operationId: 'setFeatureAccessLevel',
        bodyType: AccessLevelFeatureDto,
        responseType: AccessLevelFeatureResponseDto,
        status: 201,
        description: 'Sets permissions for a feature based on access level. Admin or website owner access required.'
    })
    async setFeatureAccessLevel(@Body() accessLevelFeatureDto: AccessLevelFeatureDto): Promise<AccessLevelFeatureResponseDto> {
        return this.featureService.setFeatureAccessLevel(accessLevelFeatureDto);
    }

    @Get('access-level/:featureName')
    @Roles(Role.ADMIN, Role.USER)
    @SwaggerRoute({
        summary: 'Get access levels for a feature',
        operationId: 'getFeatureAccessLevels',
        responseType: [AccessLevelFeatureResponseDto],
        description: 'Retrieves all access level permissions for a specific feature. Admin or website owner access required.',
        params: {
            featureName: {
                type: 'string',
                required: true
            }
        }
    })
    async getFeatureAccessLevels(@Param('featureName') featureName: string): Promise<AccessLevelFeatureResponseDto[]> {
        return this.featureService.getFeatureAccessLevels(featureName);
    }
}
