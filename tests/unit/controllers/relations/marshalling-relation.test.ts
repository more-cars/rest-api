import {describe, expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {marshalRelation} from "../../../../src/controllers/relations/marshalRelation"
import {mapModelRelationTypeToControllerRelationType} from "../../../../src/controllers/relations/mapModelRelationTypeToControllerRelationType"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {NodeType} from "../../../../src/specification/NodeType"
import {convertModelRelationToControllerRelation} from "../../../../src/controllers/relations/convertModelRelationToControllerRelation"

describe('Marshalling a relation', () => {
    test.each(
        getAllModelRelationshipTypes().map(relType => [relType])
    )('marshalling a relation $0', async (relType) => {
        const origin = getFakeNode(NodeType.Brand).modelOutput()
        const destination = getFakeNode(NodeType.CarModel).modelOutput()
        const relationship: Rel = {
            id: 3,
            type: relType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }

        const marshalledRelation = marshalRelation(convertModelRelationToControllerRelation(relationship))

        expect(marshalledRelation)
            .toStrictEqual({
                data: {
                    relationship_id: 3,
                    relationship_name: mapModelRelationTypeToControllerRelationType(relType),
                    relationship_partner: {
                        node_type: "car-models",
                        data: destination.attributes,
                    },
                    created_at: "2023-10-01T00:00:00.001Z",
                    updated_at: "2023-10-01T00:00:00.001Z",
                }
            })
    })
})
