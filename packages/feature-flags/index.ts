export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
}

export const featureFlags: Record<string, FeatureFlag> = {
  newOnboarding: {
    name: 'new-onboarding',
    enabled: true,
    description: 'Enable new onboarding flow',
  },
  approvalWorkflow: {
    name: 'approval-workflow',
    enabled: true,
    description: 'Enable approval workflow',
  },
  releaseAutomation: {
    name: 'release-automation',
    enabled: true,
    description: 'Enable release automation',
  },
};

export function isFeatureEnabled(flagName: string): boolean {
  return featureFlags[flagName]?.enabled ?? false;
}

export function getFeatureFlag(flagName: string): FeatureFlag | undefined {
  return featureFlags[flagName];
}

export function getAllFeatureFlags(): FeatureFlag[] {
  return Object.values(featureFlags);
}
