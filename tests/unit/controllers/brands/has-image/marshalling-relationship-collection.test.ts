import {expect, test} from 'vitest'
import {BrandHasImageRelationship} from "../../../../../src/models/brands/types/BrandHasImageRelationship"
import {marshalRelationships} from "../../../../../src/controllers/relationships/marshalRelationships"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"

test("marshalling a collection of ›has-image‹ relationships", async () => {
    const relationships: Array<BrandHasImageRelationship> = [
        {
            brand_id: 1,
            image_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_IMAGE",
            relationship_partner: {
                id: 111,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
        {
            brand_id: 10,
            image_id: 20,
            relationship_id: 30,
            relationship_name: "HAS_IMAGE",
            relationship_partner: {
                id: 222,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
        {
            brand_id: 100,
            image_id: 200,
            relationship_id: 300,
            relationship_name: "HAS_IMAGE",
            relationship_partner: {
                id: 333,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
    ]

    const marshalledRelationships = marshalRelationships(relationships as BaseRelationship[], "image")

    expect(marshalledRelationships)
        .toStrictEqual({
            data: [{
                data: {
                    relationship_id: 3,
                    relationship_name: "has-image",
                    relationship_partner: {
                        node_type: "image",
                        data: {
                            id: 111,
                            created_at: "dummy",
                            updated_at: "dummy",
                        }
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            }, {
                data: {
                    relationship_id: 30,
                    relationship_name: "has-image",
                    relationship_partner: {
                        node_type: "image",
                        data: {
                            id: 222,
                            created_at: "dummy",
                            updated_at: "dummy",
                        }
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            }, {
                data: {
                    relationship_id: 300,
                    relationship_name: "has-image",
                    relationship_partner: {
                        node_type: "image",
                        data: {
                            id: 333,
                            created_at: "dummy",
                            updated_at: "dummy",
                        }
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            }]
        })
})
