import { SetMetadata } from '@nestjs/common';

export const FEATURE_KEY = 'required_feature';
export const RequiresFeature = (featureName: string) => SetMetadata(FEATURE_KEY, featureName);

export const FEATURES_KEY = 'required_features';
export const RequiresFeatures = (featureNames: string[]) => SetMetadata(FEATURES_KEY, featureNames);

export const ANY_FEATURE_KEY = 'required_any_feature';
export const RequiresAnyFeature = (featureNames: string[]) => SetMetadata(ANY_FEATURE_KEY, featureNames);
