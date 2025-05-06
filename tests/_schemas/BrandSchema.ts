export const BrandSchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        full_name: {type: ["string", "null"]},
        founded: {type: ["integer", "null"]},
        defunct: {type: ["integer", "null"]},
        wmi: {type: ["string", "null"]},
        hsn: {type: ["string", "null"]},
    },
    required: [
        "id",
        "name",
    ],
    additionalProperties: false,
}
