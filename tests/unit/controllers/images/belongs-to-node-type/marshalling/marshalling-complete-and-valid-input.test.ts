import {expect, test} from 'vitest'
import type {ImageBelongsToNodeTypeRelationships} from "../../../../../../src/models/node-types/images/types/ImageBelongsToNodeTypeRelationships"
import {marshalBelongsToNodeTypeRelationships} from "../../../../../../src/controllers/node-types/images/marshalling/marshalBelongsToNodeTypeRelationships"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {kebabCase} from "change-case"
import {RelationType} from "../../../../../../src/controllers/relations/types/RelationType"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

test('marshalling a ›belongs-to-node-type‹ relationship collection', async () => {
    const relationships: ImageBelongsToNodeTypeRelationships = {
        companies: [getRelationshipModel(ControllerNodeType.Company)],
        brands: [getRelationshipModel(ControllerNodeType.Brand)],
        car_models: [getRelationshipModel(ControllerNodeType.CarModel)],
        race_tracks: [getRelationshipModel(ControllerNodeType.RaceTrack)],
        track_layouts: [getRelationshipModel(ControllerNodeType.TrackLayout)],
        racing_series: [getRelationshipModel(ControllerNodeType.RacingSeries)],
        racing_events: [getRelationshipModel(ControllerNodeType.RacingEvent)],
    }

    const mappedNode = marshalBelongsToNodeTypeRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual({
            data: {
                companies: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.Company)
                    }],
                },
                brands: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.Brand)
                    }],
                },
                car_models: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.CarModel)
                    }]
                },
                race_tracks: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.RaceTrack)
                    }]
                },
                track_layouts: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.TrackLayout)
                    }]
                },
                racing_series: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.RacingSeries)
                    }]
                },
                racing_events: {
                    data: [{
                        data: getExpectedMarshalledRelation(ControllerNodeType.RacingEvent)
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