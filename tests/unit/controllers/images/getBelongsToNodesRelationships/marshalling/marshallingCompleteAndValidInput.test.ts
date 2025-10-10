import {expect, test} from 'vitest'
import {ImageBelongsToNodeRelationship} from "../../../../../../src/models/images/types/ImageBelongsToNodeRelationship"
import {marshalRelationships} from "../../../../../../src/controllers/relationships/marshalRelationships"
import type {BaseRelationship} from "../../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalling a complete and valid request', async () => {
    const relationships: Array<ImageBelongsToNodeRelationship> = [
        {
            image_id: 1,
            partner_node_id: 2,
            relationship_id: 3,
            relationship_name: "BELONGS_TO_BRAND",
            relationship_partner: {
                id: 111,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            image_id: 10,
            partner_node_id: 20,
            relationship_id: 30,
            relationship_name: "BELONGS_TO_COMPANY",
            relationship_partner: {
                id: 222,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            image_id: 100,
            partner_node_id: 200,
            relationship_id: 300,
            relationship_name: "BELONGS_TO_CAR_MODEL",
            relationship_partner: {
                id: 333,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalRelationships(relationships as BaseRelationship[], 'brand')

    expect(mappedNode)
        .toStrictEqual({
            data: [{
                data: {
                    relationship_id: 3,
                    relationship_name: "belongs-to-brand",
                    relationship_partner: {
                        node_type: 'brand',
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
                    relationship_name: "belongs-to-company",
                    relationship_partner: {
                        node_type: 'brand', // TODO currently hard-coded in the marshal function
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
                    relationship_name: "belongs-to-car-model",
                    relationship_partner: {
                        node_type: 'brand', // TODO currently hard-coded in the marshal function
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
