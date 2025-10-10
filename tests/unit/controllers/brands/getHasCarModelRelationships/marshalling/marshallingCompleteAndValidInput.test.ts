import {expect, test} from 'vitest'
import {BrandHasCarModelRelationship} from "../../../../../../src/models/brands/types/BrandHasCarModelRelationship"
import {marshalRelationships} from "../../../../../../src/controllers/relationships/marshalRelationships"
import type {BaseRelationship} from "../../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalling a complete and valid request', async () => {
    const relationships: Array<BrandHasCarModelRelationship> = [
        {
            brand_id: 1,
            car_model_id: 2,
            relationship_id: 3,
            relationship_name: "HAS_CAR_MODEL",
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
            car_model_id: 20,
            relationship_id: 30,
            relationship_name: "HAS_CAR_MODEL",
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
            car_model_id: 200,
            relationship_id: 300,
            relationship_name: "HAS_CAR_MODEL",
            relationship_partner: {
                id: 333,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalRelationships(relationships as BaseRelationship[], 'car model')

    expect(mappedNode)
        .toStrictEqual({
            data: [{
                data: {
                    relationship_id: 3,
                    relationship_name: "has-car-model",
                    relationship_partner: {
                        node_type: 'car-model',
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
                    relationship_name: "has-car-model",
                    relationship_partner: {
                        node_type: 'car-model',
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
                    relationship_name: "has-car-model",
                    relationship_partner: {
                        node_type: 'car-model',
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
