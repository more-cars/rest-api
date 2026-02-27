import {describe, expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {FakeNode} from "../../../_toolbox/fixtures/nodes/FakeNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {convertModelRelationToControllerRelation} from "../../../../src/controllers/relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../../../src/controllers/relations/marshalRelations"

describe('Marshalling a relation collection', () => {
    test.each(
        getAllModelRelationshipTypes().map(relType => [relType])
    )('when creating a relation from type $0', async (relType) => {
        const origin = FakeNode(DbNodeType.Brand).modelOutput()
        const destination = FakeNode(DbNodeType.CarModel).modelOutput()
        const rel: Rel = {
            id: 3,
            type: relType,
            origin,
            destination,
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        }
        const relation = convertModelRelationToControllerRelation(rel)
        const relations = [relation, relation, relation]

        const marshalledRelations = marshalRelations(relations)

        expect(marshalledRelations.data.length)
            .toEqual(3)

        const expectedRelation = {
            data: {
                relationship_id: 3,
                relationship_name: relation.type,
                relationship_partner: {
                    node_type: "car-models",
                    data: destination.attributes,
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
