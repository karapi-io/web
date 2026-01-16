// V1 Version Bundle - Export everything for this version
import { V1_CONFIG } from "./config";
import { V1_SCHEMA } from "./schema.ts";
import { V1_TEMPLATES, V1_TEMPLATE_PAYLOADS, V1_BILL_OF_SUPPLY_PAYLOAD, V1_OUTPUT_FORMATS } from "./templates.ts";

export const v1 = {
    config: V1_CONFIG,
    templates: V1_TEMPLATES,
    templatePayloads: V1_TEMPLATE_PAYLOADS,
    billOfSupplyPayload: V1_BILL_OF_SUPPLY_PAYLOAD,
    outputFormats: V1_OUTPUT_FORMATS,
    schema: V1_SCHEMA,
};

export * from "./config";
export * from "./templates.ts";
export * from "./schema.ts";
