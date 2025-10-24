import {expect, test} from 'vitest'
import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../../../../src/models/images/types/ImageBelongsToNodeTypeRelationships"
import {
    marshalBelongsToNodeTypeRelationships
} from "../../../../../../src/controllers/images/marshalling/marshalBelongsToNodeTypeRelationships"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {kebabCase} from "change-case"

test('marshalling a ›belongs-to-node-type‹ relationship collection', async () => {
    const relationships: ImageBelongsToNodeTypeRelationships = {
        companies: [getRelationshipModel(NodeTypeEnum.COMPANY)],
        brands: [getRelationshipModel(NodeTypeEnum.BRAND)],
        car_models: [getRelationshipModel(NodeTypeEnum.CAR_MODEL)],
        race_tracks: [getRelationshipModel(NodeTypeEnum.RACE_TRACK)],
        track_layouts: [getRelationshipModel(NodeTypeEnum.TRACK_LAYOUT)],
        racing_series: [getRelationshipModel(NodeTypeEnum.RACING_SERIES)],
        racing_events: [getRelationshipModel(NodeTypeEnum.RACING_EVENT)],
    }

    const mappedNode = marshalBelongsToNodeTypeRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual({
            data: {
                companies: {
                    data: [{
                        data: getMarshalledRelation(NodeTypeEnum.COMPANY)
                    }],
                },
                brands: {
                    data: [{
                        data: getMarshalledRelation(NodeTypeEnum.BRAND)
                    }],
                },
                car_models: {
                    data: [{
                        data: getMarshalledRelation(NodeTypeEnum.CAR_MODEL)
                    }]
                },
                race_tracks: {
                    data: [{
                        data: getMarshalledRelation(NodeTypeEnum.RACE_TRACK)
                    }]
                },
                track_layouts: {
                    data: [{
                        data: getMarshalledRelation(NodeTypeEnum.TRACK_LAYOUT)
                    }]
                },
                racing_series: {
                    data: [{
                        data: getMarshalledRelation(NodeTypeEnum.RACING_SERIES)
                    }]
                },
                racing_events: {
                    data: [{
                        data: getMarshalledRelation(NodeTypeEnum.RACING_EVENT)
                    }]
                },
            }
        })
})

function getRelationshipModel(nodeType: NodeTypeEnum) {
    return {
        id: 1,
        type: 'BELONGS_TO_' + nodeType,
        origin: {
            id: 2,
            created_at: "dummy",
            updated_at: "dummy",
        },
        destination: {
            id: 3,
            created_at: "dummy",
            updated_at: "dummy",
        },
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }
}

function getMarshalledRelation(nodeType: NodeTypeEnum) {
    return {
        relationship_id: 1,
        relationship_name: 'belongs-to-' + kebabCase(nodeType),
        relationship_partner: {
            node_type: kebabCase(nodeType),
            data: {
                id: 3,
                created_at: "dummy",
                updated_at: "dummy",
            },
        },
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }
}