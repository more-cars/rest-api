import {expect, test} from 'vitest'
import type {ImageBelongsToNodeTypeRelationships} from "../../../../../../src/models/node-types/images/types/ImageBelongsToNodeTypeRelationships"
import {marshalBelongsToNodeTypeRelationships} from "../../../../../../src/controllers/node-types/images/marshalling/marshalBelongsToNodeTypeRelationships"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {kebabCase} from "change-case"
import {RelationType} from "../../../../../../src/controllers/relations/types/RelationType"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import type {Rel} from "../../../../../../src/models/relationships/types/Rel"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import type {RelationResponse} from "../../../../../../src/controllers/relations/types/RelationResponse"

test('marshalling a ›belongs-to-node-type‹ relationship collection', async () => {
    const relationships: ImageBelongsToNodeTypeRelationships = {
        companies: [getRelationshipModel(ModelNodeType.Company)],
        brands: [getRelationshipModel(ModelNodeType.Brand)],
        car_models: [getRelationshipModel(ModelNodeType.CarModel)],
        race_tracks: [getRelationshipModel(ModelNodeType.RaceTrack)],
        track_layouts: [getRelationshipModel(ModelNodeType.TrackLayout)],
        racing_series: [getRelationshipModel(ModelNodeType.RacingSeries)],
        racing_events: [getRelationshipModel(ModelNodeType.RacingEvent)],
    }

    const mappedNode = marshalBelongsToNodeTypeRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual({
            data: {
                companies: {
                    data: [getExpectedMarshalledRelation(ControllerNodeType.Company)],
                },
                brands: {
                    data: [getExpectedMarshalledRelation(ControllerNodeType.Brand)],
                },
                car_models: {
                    data: [getExpectedMarshalledRelation(ControllerNodeType.CarModel)]
                },
                race_tracks: {
                    data: [getExpectedMarshalledRelation(ControllerNodeType.RaceTrack)]
                },
                track_layouts: {
                    data: [getExpectedMarshalledRelation(ControllerNodeType.TrackLayout)]
                },
                racing_series: {
                    data: [getExpectedMarshalledRelation(ControllerNodeType.RacingSeries)]
                },
                racing_events: {
                    data: [getExpectedMarshalledRelation(ControllerNodeType.RacingEvent)]
                },
            }
        })
})

function getRelationshipModel(modelNodeType: ModelNodeType) {
    return {
        id: 1,
        type: RelType.ImageBelongsToNode,
        origin: {
            node_type: modelNodeType,
            attributes: {
                id: 2,
                created_at: "dummy",
                updated_at: "dummy",
            }
        },
        destination: {
            node_type: modelNodeType,
            attributes: {
                id: 3,
                created_at: "dummy",
                updated_at: "dummy",
            }
        },
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    } satisfies Rel
}

function getExpectedMarshalledRelation(nodeType: ControllerNodeType) {
    return {
        data: {
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
    } satisfies RelationResponse
}