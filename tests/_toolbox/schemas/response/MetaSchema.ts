export const MetaSchema = {
    type: "object",
    properties: {
        page: {
            type: "object",
            properties: {
                current: {type: ["number"]},
                size: {type: ["number"]},
                total_nodes: {type: ["number"]},
                total_pages: {type: ["number"]},
            },
            required: [
                "current",
                "size",
                "total_nodes",
                "total_pages",
            ],
            additionalProperties: false,
        }
    },
    required: [
        "page",
    ],
    additionalProperties: false,
}
