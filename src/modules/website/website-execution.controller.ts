import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { Role } from '@modules/auth/enums/roles.enum';
import { SetupWebsiteDto } from '@shared/dto/website/setup-website.dto';
import { Website } from '@entities/website.entity';
import { WebsiteExecutionService } from '@modules/website/website-execution.service';
import { SwaggerRoute } from '@shared/decorators/swagger.decorator';

@ApiTags('Website Execution')
@ApiBearerAuth('JWT')
@Controller('website-execution')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WebsiteExecutionController {
  constructor(private readonly websiteExecutionService: WebsiteExecutionService) {}

  @Post('setup')
  @Roles(Role.ADMIN, Role.USER)
  @SwaggerRoute({
    summary: 'Set up a new website with tracking ID and features',
    operationId: 'setupWebsite',
    bodyType: SetupWebsiteDto,
    responseType: Website,
    status: 201,
    description: 'Creates a new website with tracking ID and enables selected features'
  })
  async setupWebsite(@Body() setupWebsiteDto: SetupWebsiteDto): Promise<Website> {
    return this.websiteExecutionService.setupWebsite(setupWebsiteDto);
  }
}
