// Version Registry - Central hub for all API versions
import { v1 } from "./v1";
import type { Template, OutputFormat, SchemaField } from "../../types/api";

// Version Status Types
export type ApiVersionStatus = "stable" | "beta" | "deprecated";

// Version Configuration Interface
export interface ApiVersionConfig {
    id: string;
    label: string;
    description: string;
    status: ApiVersionStatus;
    endpoint: string;
    apiKeyUrl: string;
}

// Complete Version Bundle Interface
export interface VersionBundle {
    config: ApiVersionConfig;
    templates: Template[];
    templatePayloads: Record<string, object>;
    billOfSupplyPayload: object;
    outputFormats: OutputFormat[];
    schema: SchemaField[];
}

// Version Registry - Add new versions here
export const VERSION_REGISTRY: Record<string, VersionBundle> = {
    v1: v1,
    // Future versions:
    // v2: v2,
};

// Get list of all available versions
export const getAvailableVersions = (): ApiVersionConfig[] => {
    return Object.values(VERSION_REGISTRY).map((bundle) => bundle.config);
};

// Get a specific version bundle
export const getVersionBundle = (versionId: string): VersionBundle => {
    const bundle = VERSION_REGISTRY[versionId];
    if (!bundle) {
        console.warn(`Version ${versionId} not found, falling back to v1`);
        return VERSION_REGISTRY.v1;
    }
    return bundle;
};

// Get default version
export const getDefaultVersion = (): VersionBundle => {
    return VERSION_REGISTRY.v1;
};

// Export v1 as default for backwards compatibility
export { v1 };
export * from "./v1";
