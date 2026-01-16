import { useState, useCallback, useMemo } from "react";
import { getVersionBundle, getAvailableVersions, type VersionBundle, type ApiVersionConfig } from "../data/versions";

// Hook to manage API version state and provide version-specific data
export function useApiVersion(initialVersion: string = "v1") {
    const [currentVersionId, setCurrentVersionId] = useState(initialVersion);

    // Get the current version bundle
    const versionBundle = useMemo((): VersionBundle => {
        return getVersionBundle(currentVersionId);
    }, [currentVersionId]);

    // Get all available versions
    const availableVersions = useMemo((): ApiVersionConfig[] => {
        return getAvailableVersions();
    }, []);

    // Switch to a different version
    const switchVersion = useCallback((versionId: string) => {
        setCurrentVersionId(versionId);
    }, []);

    // Convenience getters
    const config = versionBundle.config;
    const templates = versionBundle.templates;
    const templatePayloads = versionBundle.templatePayloads;
    const billOfSupplyPayload = versionBundle.billOfSupplyPayload;
    const outputFormats = versionBundle.outputFormats;
    const schema = versionBundle.schema;
    const endpoint = versionBundle.config.endpoint;
    const apiKeyUrl = versionBundle.config.apiKeyUrl;

    return {
        // Current version info
        currentVersionId,
        versionBundle,
        config,

        // Version-specific data
        templates,
        templatePayloads,
        billOfSupplyPayload,
        outputFormats,
        schema,
        endpoint,
        apiKeyUrl,

        // Version management
        availableVersions,
        switchVersion,
    };
}
