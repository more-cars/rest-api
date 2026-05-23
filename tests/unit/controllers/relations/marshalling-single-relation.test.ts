import {describe, expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {ExpectedNodeType} from "../../../_toolbox/types/ExpectedNodeType"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {marshalSingleRelation} from "../../../../src/controllers/relations/marshalSingleRelation"
import {convertModelRelationToControllerRelation} from "../../../../src/controllers/relations/convertModelRelationToControllerRelation"
import {convertStringToControllerNodeType} from "../../../_toolbox/convertStringToNodeType"
import {validateJson} from "../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../_toolbox/schemas/response/RelationshipSchema"
import {mapModelRelationTypeToControllerRelationType} from "../../../../src/controllers/relations/mapModelRelationTypeToControllerRelationType"

describe('Marshalling single relation', () => {
    test.each(
        getAllModelRelationshipTypes().map(relType => [relType])
    )('$0', async (relType) => {
        const origin = getFakeNode(ExpectedNodeType.Brand).modelOutput()
        const destination = getFakeNode(ExpectedNodeType.CarModel).modelOutput()
        const relationship: Rel = {
            id: 3,
            type: relType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }

        const marshalledRelation = marshalSingleRelation(convertModelRelationToControllerRelation(relationship))
        const sourceNodeType = convertStringToControllerNodeType(origin.node_type)
        const targetNodeType = convertStringToControllerNodeType(destination.node_type)
        const {id, ...attributes} = destination.attributes

        // schema check
        expect(validateJson(marshalledRelation, RelationshipSchema))
            .toBeTruthy()

        // data check
        expect(marshalledRelation)
            .toStrictEqual({
                links: {
                    self: `/${sourceNodeType}/${origin.attributes.id}/${mapModelRelationTypeToControllerRelationType(relType)}`,
                    related: `/${targetNodeType}/${id}`,
                },
                data: {
                    type: targetNodeType,
                    id,
                    attributes,
                    relationship_id: 3,
                    relationship_name: mapModelRelationTypeToControllerRelationType(relType),
                    start_node: {
                        node_type: "brands",
                        data: origin.attributes,
                    },
                    partner_node: {
                        node_type: "car-models",
                        data: destination.attributes,
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            })
    })
})
