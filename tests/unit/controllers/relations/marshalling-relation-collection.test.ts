import {expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import type {GenericRelation} from "../../../../src/models/relationships/types/GenericRelation"
import {dasherize} from "inflection"
import {FakeNode} from "../../../_toolbox/fixtures/nodes/FakeNode"
import type {BaseNode} from "../../../../src/controllers/nodes/types/BaseNode"
import {marshalRelations} from "../../../../src/controllers/relationships/marshalRelations"

test('marshalling a relation collection', async () => {
    getAllModelRelationshipTypes().forEach((modelRelationshipType) => {
        const origin = FakeNode('brand') as unknown as BaseNode
        const destination = FakeNode('car model') as unknown as BaseNode
        const relation: GenericRelation = {
            id: 3,
            type: modelRelationshipType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }
        const relations = [relation, relation, relation]

        const marshalledData = marshalRelations(relations, "car model")

        expect(marshalledData.data.length)
            .toEqual(3)

        const expectedRelation = {
            data: {
                relationship_id: 3,
                relationship_name: dasherize(modelRelationshipType.toLowerCase()),
                relationship_partner: {
                    node_type: "car-model",
                    data: destination,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        }

        expect(marshalledData.data[0])
            .toStrictEqual(expectedRelation)

        expect(marshalledData.data[1])
            .toStrictEqual(expectedRelation)

        expect(marshalledData.data[2])
            .toStrictEqual(expectedRelation)
    })
})
