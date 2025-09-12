export const CompanySchema = {
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        founded: {type: ["integer", "null"]},
        defunct: {type: ["integer", "null"]},
        headquarters_location: {type: ["string", "null"]},
        legal_headquarters_location: {type: ["string", "null"]},
        created_at: {type: "string"},
        updated_at: {type: "string"},
    },
    required: [
        "id",
        "name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
}
