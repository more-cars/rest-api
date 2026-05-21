import {describe, expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {ExpectedNodeType} from "../../../_toolbox/types/ExpectedNodeType"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {marshalRelation} from "../../../../src/controllers/relations/marshalRelation"
import {convertModelRelationToControllerRelation} from "../../../../src/controllers/relations/convertModelRelationToControllerRelation"
import {validateJson} from "../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../_toolbox/schemas/response/RelationshipSchema"
import {convertStringToControllerNodeType} from "../../../_toolbox/convertStringToNodeType"
import {mapModelRelationTypeToControllerRelationType} from "../../../../src/controllers/relations/mapModelRelationTypeToControllerRelationType"

describe('Marshalling a relation', () => {
    test.each(
        getAllModelRelationshipTypes().map(relType => [relType])
    )('marshalling a relation $0', async (relType) => {
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

        const marshalledRelation = marshalRelation(convertModelRelationToControllerRelation(relationship))

        // schema check
        expect(validateJson(marshalledRelation, RelationshipSchema))
            .toBeTruthy()

        // data check
        expect(marshalledRelation)
            .toStrictEqual({
                links: {
                    self: `/${convertStringToControllerNodeType(origin.node_type)}/${origin.attributes.id}/${mapModelRelationTypeToControllerRelationType(relType)}`,
                    related: `/${convertStringToControllerNodeType(destination.node_type)}/${destination.attributes.id}`,
                },
                data: {
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
