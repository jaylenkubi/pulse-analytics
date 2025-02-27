import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FeatureService } from '../../modules/feature/feature.service';
import { FEATURE_KEY, FEATURES_KEY, ANY_FEATURE_KEY } from '../decorators/requires-feature.decorator';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private featureService: FeatureService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the feature required for this endpoint
    const requiredFeature = this.reflector.getAllAndOverride<string>(FEATURE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Get the features required for this endpoint (all must be accessible)
    const requiredFeatures = this.reflector.getAllAndOverride<string[]>(FEATURES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Get the features required for this endpoint (at least one must be accessible)
    const requiredAnyFeature = this.reflector.getAllAndOverride<string[]>(ANY_FEATURE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no feature requirements, allow access
    if (!requiredFeature && !requiredFeatures && !requiredAnyFeature) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    
    // Get websiteId from params, query, or body
    const websiteId = request.params.websiteId || 
                      request.query.websiteId || 
                      request.body.websiteId;

    // If no user or website ID is provided, deny access
    if (!userId || !websiteId) {
      throw new UnauthorizedException('User or website information missing');
    }

    // Check single feature requirement
    if (requiredFeature) {
      const hasAccess = await this.featureService.canUserAccessFeature(
        userId,
        websiteId,
        requiredFeature
      );

      if (!hasAccess) {
        throw new UnauthorizedException(`You don't have access to the ${requiredFeature} feature`);
      }

      return true;
    }

    // Check multiple features requirement (AND logic)
    if (requiredFeatures) {
      for (const feature of requiredFeatures) {
        const hasAccess = await this.featureService.canUserAccessFeature(
          userId,
          websiteId,
          feature
        );

        if (!hasAccess) {
          throw new UnauthorizedException(`You don't have access to the ${feature} feature`);
        }
      }

      return true;
    }

    // Check any feature requirement (OR logic)
    if (requiredAnyFeature) {
      for (const feature of requiredAnyFeature) {
        const hasAccess = await this.featureService.canUserAccessFeature(
          userId,
          websiteId,
          feature
        );

        if (hasAccess) {
          return true;
        }
      }

      throw new UnauthorizedException(`You don't have access to any of the required features`);
    }

    return false;
  }
}
