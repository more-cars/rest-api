import {expect, test} from 'vitest'
import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../../../../src/models/images/types/ImageBelongsToNodeTypeRelationships"
import {
    marshalBelongsToNodeTypeRelationships
} from "../../../../../../src/controllers/images/marshalling/marshalBelongsToNodeTypeRelationships"

test('marshalling a ›belongs-to-node-type‹ relationship collection', async () => {
    const relationships: ImageBelongsToNodeTypeRelationships = {
        companies: [{
            id: 3,
            type: 'BELONGS_TO_COMPANY',
            origin: {
                id: 1,
                created_at: "dummy",
                updated_at: "dummy",
            },
            destination: {
                id: 2,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }],
        brands: [{
            id: 30,
            type: 'BELONGS_TO_BRAND',
            origin: {
                id: 10,
                created_at: "dummy",
                updated_at: "dummy",
            },
            destination: {
                id: 20,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }, {
            id: 31,
            type: 'BELONGS_TO_BRAND',
            origin: {
                id: 11,
                created_at: "dummy",
                updated_at: "dummy",
            },
            destination: {
                id: 21,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }],
        car_models: [{
            id: 300,
            type: 'BELONGS_TO_CAR_MODEL',
            origin: {
                id: 100,
                created_at: "dummy",
                updated_at: "dummy",
            },
            destination: {
                id: 200,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }]
    }

    const mappedNode = marshalBelongsToNodeTypeRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual({
            data: {
                companies: {
                    data: [{
                        data: {
                            relationship_id: 3,
                            relationship_name: "belongs-to-company",
                            relationship_partner: {
                                node_type: 'company',
                                data: {
                                    id: 2,
                                    created_at: "dummy",
                                    updated_at: "dummy",
                                },
                            },
                            created_at: "2023-10-01T00:00:00.001Z",
                            updated_at: "2023-10-01T00:00:00.001Z",
                        },
                    }],
                },
                brands: {
                    data: [{
                        data: {
                            relationship_id: 30,
                            relationship_name: "belongs-to-brand",
                            relationship_partner: {
                                node_type: 'brand',
                                data: {
                                    id: 20,
                                    created_at: "dummy",
                                    updated_at: "dummy",
                                },
                            },
                            created_at: "2023-10-01T00:00:00.001Z",
                            updated_at: "2023-10-01T00:00:00.001Z",
                        },
                    }, {
                        data: {
                            relationship_id: 31,
                            relationship_name: "belongs-to-brand",
                            relationship_partner: {
                                node_type: 'brand',
                                data: {
                                    id: 21,
                                    created_at: "dummy",
                                    updated_at: "dummy",
                                },
                            },
                            created_at: "2023-10-01T00:00:00.001Z",
                            updated_at: "2023-10-01T00:00:00.001Z",
                        },
                    }],
                },
                car_models: {
                    data: [{
                        data: {
                            relationship_id: 300,
                            relationship_name: "belongs-to-car-model",
                            relationship_partner: {
                                node_type: 'car-model',
                                data: {
                                    id: 200,
                                    created_at: "dummy",
                                    updated_at: "dummy",
                                },
                            },
                            created_at: "2023-10-01T00:00:00.001Z",
                            updated_at: "2023-10-01T00:00:00.001Z",
                        },
                    }]
                }
            }
        })
})
