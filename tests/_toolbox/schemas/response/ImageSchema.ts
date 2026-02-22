export const ImageSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                // system data
                id: {type: ["integer"]},
                created_at: {type: ["string"]},
                updated_at: {type: ["string"]},

                // user data
                image_provider: {type: ["string"]},
                external_id: {type: ["string"]},

                // generated data
                name: {type: ["string"]},
                description: {type: ["string", "null"]},
                creator: {type: ["string"]},
                license: {type: ["string"]},
                tags: {type: ["string", "null"]},
                source: {type: ["string"]},
                image_url_original: {type: ["string"]},
                image_url_xxl: {type: ["string", "null"]},
                image_url_xl: {type: ["string", "null"]},
                image_url_l: {type: ["string", "null"]},
                image_url_m: {type: ["string", "null"]},
                image_url_s: {type: ["string", "null"]},
                image_url_xs: {type: ["string", "null"]},
            },
            required: [
                "id",
                "created_at",
                "updated_at",
                "image_provider",
                "external_id",
                "name",
                "creator",
                "license",
                "source",
                "image_url_original",
            ],
        },
    },
    additionalProperties: false,
}
