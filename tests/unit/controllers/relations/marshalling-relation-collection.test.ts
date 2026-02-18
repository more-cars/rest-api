import {expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {FakeNodeInput} from "../../../_toolbox/fixtures/nodes/FakeNodeInput"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BaseNode} from "../../../../src/controllers/nodes/types/BaseNode"
import type {GenericRelation} from "../../../../src/models/relationships/types/GenericRelation"
import {marshalRelations} from "../../../../src/controllers/relationships/marshalRelations"
import {mapModelRelationToControllerRelation} from "../../../../src/controllers/relationships/mapModelRelationToControllerRelation"

test('marshalling a relation collection', async () => {
    getAllModelRelationshipTypes().forEach((relationshipType) => {
        const origin = FakeNodeInput(NodeTypeEnum.BRAND) as unknown as BaseNode
        const destination = FakeNodeInput(NodeTypeEnum.CAR_MODEL) as unknown as BaseNode
        const relationship: GenericRelation = {
            id: 3,
            type: relationshipType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }
        const relationships = [relationship, relationship, relationship]

        const marshalledRelations = marshalRelations(relationships, NodeTypeEnum.CAR_MODEL)

        expect(marshalledRelations.data.length)
            .toEqual(3)

        const expectedRelation = {
            data: {
                relationship_id: 3,
                relationship_name: mapModelRelationToControllerRelation(relationshipType),
                relationship_partner: {
                    node_type: "car-model",
                    data: destination,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        }

        expect(marshalledRelations.data[0])
            .toStrictEqual(expectedRelation)

        expect(marshalledRelations.data[1])
            .toStrictEqual(expectedRelation)

        expect(marshalledRelations.data[2])
            .toStrictEqual(expectedRelation)
    })
})
