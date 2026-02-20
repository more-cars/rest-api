import {expect, test} from 'vitest'
import type {ImageBelongsToNodeTypeRelationships} from "../../../../../../src/models/node-types/images/types/ImageBelongsToNodeTypeRelationships"
import {
    marshalBelongsToNodeTypeRelationships
} from "../../../../../../src/controllers/node-types/images/marshalling/marshalBelongsToNodeTypeRelationships"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {kebabCase} from "change-case"
import {RelationType} from "../../../../../../src/controllers/relations/types/RelationType"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

test('marshalling a ›belongs-to-node-type‹ relationship collection', async () => {
    const relationships: ImageBelongsToNodeTypeRelationships = {
        companies: [getRelationshipModel(ControllerNodeType.COMPANY)],
        brands: [getRelationshipModel(ControllerNodeType.BRAND)],
        car_models: [getRelationshipModel(ControllerNodeType.CAR_MODEL)],
        race_tracks: [getRelationshipModel(ControllerNodeType.RACE_TRACK)],
        track_layouts: [getRelationshipModel(ControllerNodeType.TRACK_LAYOUT)],
        racing_series: [getRelationshipModel(ControllerNodeType.RACING_SERIES)],
        racing_events: [getRelationshipModel(ControllerNodeType.RACING_EVENT)],
    }

    const mappedNode = marshalBelongsToNodeTypeRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual({
            data: {
                companies: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.COMPANY)
                    }],
                },
                brands: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.BRAND)
                    }],
                },
                car_models: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.CAR_MODEL)
                    }]
                },
                race_tracks: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.RACE_TRACK)
                    }]
                },
                track_layouts: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.TRACK_LAYOUT)
                    }]
                },
                racing_series: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.RACING_SERIES)
                    }]
                },
                racing_events: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.RACING_EVENT)
                    }]
                },
            }
        })
})

function getRelationshipModel(nodeType: ControllerNodeType) {
    return {
        id: 1,
        type: RelType.ImageBelongsToNode,
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

function getExpectedMarshalledRelation(nodeType: ControllerNodeType) {
    return {
        relationship_id: 1,
        relationship_name: RelationType.ImageBelongsToNode,
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