import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { FeatureService } from './feature.service';
import { Feature } from '../../database/entities/feature.entity';
import { WebsiteFeature } from '../../database/entities/website-feature.entity';
import { AccessLevelFeature } from '../../database/entities/access-level-feature.entity';
import { CreateFeatureDto } from '../../shared/dto/feature/create-feature.dto';
import { UpdateFeatureDto } from '../../shared/dto/feature/update-feature.dto';
import { WebsiteFeatureDto } from '../../shared/dto/feature/website-feature.dto';
import { AccessLevelFeatureDto } from '../../shared/dto/feature/access-level-feature.dto';

@Controller('features')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FeatureController {
    constructor(private readonly featureService: FeatureService) {}

    // Global Feature Management (Admin only)
    @Post()
    @Roles(Role.ADMIN)
    async createFeature(@Body() createFeatureDto: CreateFeatureDto): Promise<Feature> {
        return this.featureService.createFeature(createFeatureDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    async getAllFeatures(): Promise<Feature[]> {
        return this.featureService.getAllFeatures();
    }

    @Get(':name')
    @Roles(Role.ADMIN)
    async getFeatureByName(@Param('name') name: string): Promise<Feature> {
        return this.featureService.getFeatureByName(name);
    }

    @Put(':name')
    @Roles(Role.ADMIN)
    async updateFeature(
        @Param('name') name: string,
        @Body() updateFeatureDto: UpdateFeatureDto
    ): Promise<Feature> {
        return this.featureService.updateFeature(name, updateFeatureDto);
    }

    @Delete(':name')
    @Roles(Role.ADMIN)
    async deleteFeature(@Param('name') name: string): Promise<void> {
        return this.featureService.deleteFeature(name);
    }

    // Website Feature Management
    @Post('website')
    @Roles(Role.ADMIN, Role.USER) // Website owners can manage their features
    async enableFeatureForWebsite(@Body() websiteFeatureDto: WebsiteFeatureDto): Promise<WebsiteFeature> {
        return this.featureService.enableFeatureForWebsite(websiteFeatureDto);
    }

    @Get('website/:websiteId')
    @Roles(Role.ADMIN, Role.USER)
    async getWebsiteFeatures(@Param('websiteId') websiteId: string): Promise<WebsiteFeature[]> {
        return this.featureService.getWebsiteFeatures(websiteId);
    }

    // Access Level Feature Management
    @Post('access-level')
    @Roles(Role.ADMIN, Role.USER) // Website owners can manage access levels
    async setFeatureAccessLevel(@Body() accessLevelFeatureDto: AccessLevelFeatureDto): Promise<AccessLevelFeature> {
        return this.featureService.setFeatureAccessLevel(accessLevelFeatureDto);
    }

    @Get('access-level/:featureName')
    @Roles(Role.ADMIN, Role.USER)
    async getFeatureAccessLevels(@Param('featureName') featureName: string): Promise<AccessLevelFeature[]> {
        return this.featureService.getFeatureAccessLevels(featureName);
    }
}
