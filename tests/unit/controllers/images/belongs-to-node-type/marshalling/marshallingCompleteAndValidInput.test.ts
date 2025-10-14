import {expect, test} from 'vitest'
import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../../../../src/models/images/types/ImageBelongsToNodeTypeRelationships"
import {
    marshalBelongsToNodeTypeRelationships
} from "../../../../../../src/controllers/images/marshalling/marshalBelongsToNodeTypeRelationships"

test('marshalling a complete and valid request', async () => {
    const relationships: ImageBelongsToNodeTypeRelationships = {
        companies: [{
            image_id: 1,
            partner_node_id: 2,
            relationship_id: 3,
            relationship_name: "belongs-to-company",
            relationship_partner: {
                id: 111,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }],
        brands: [{
            image_id: 10,
            partner_node_id: 20,
            relationship_id: 30,
            relationship_name: "belongs-to-brand",
            relationship_partner: {
                id: 111,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }, {
            image_id: 11,
            partner_node_id: 21,
            relationship_id: 31,
            relationship_name: "belongs-to-brand",
            relationship_partner: {
                id: 111,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }],
        car_models: [{
            image_id: 100,
            partner_node_id: 200,
            relationship_id: 300,
            relationship_name: "belongs-to-car-model",
            relationship_partner: {
                id: 111,
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
                                node_type: 'brand', // TODO currently hard-coded in the marshal function
                                data: {
                                    id: 111,
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
                                    id: 111,
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
                                    id: 111,
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
                                node_type: 'brand',
                                data: {
                                    id: 111,
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
