export const PaginationSchema = {
    type: "object",
    properties: {
        self: {type: ["string"]},
        first: {type: ["string"]},
        prev: {type: ["string", "null"]},
        next: {type: ["string", "null"]},
        last: {type: ["string"]},
    },
    required: [
        "self",
        "first",
        "prev",
        "next",
        "last",
    ],
    additionalProperties: false,
}
