import {describe, expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {convertModelRelationToControllerRelation} from "../../../../src/controllers/relations/convertModelRelationToControllerRelation"
import {getFakeRel} from "../../../_toolbox/fixtures/relationships/getFakeRel"
import {marshalRelations} from "../../../../src/controllers/relations/marshalRelations"
import {validateJson} from "../../../_toolbox/validateJson"
import {RelationshipCollectionSchema} from "../../../_toolbox/schemas/response/RelationshipCollectionSchema"

describe('Marshalling a relation collection', () => {
    test.each(
        getAllModelRelationshipTypes().map(relType => [relType])
    )('when creating a relation from type $0', async (relType) => {
        const relationA = convertModelRelationToControllerRelation(getFakeRel(relType))
        const relationB = convertModelRelationToControllerRelation(getFakeRel(relType))
        const relationC = convertModelRelationToControllerRelation(getFakeRel(relType))
        const relations = [relationA, relationB, relationC]

        const marshalledRelations = marshalRelations(relations, relationA.from_node.node_type, relationA.from_node.fields.id, relationA.type)

        expect(marshalledRelations.data.length)
            .toEqual(3)

        // schema check
        expect(validateJson(marshalledRelations, RelationshipCollectionSchema))
            .toBeTruthy()

        // data check
        const expectedRelations = {
            links: {
                self: `/${relationA.from_node.node_type}/${relationA.from_node.fields.id}/${relationA.type}`,
            },
            data: [relationA, relationB, relationC].map(relation => {
                const {id, ...attributes} = relation.to_node.fields

                return {
                    type: relation.to_node.node_type,
                    id,
                    attributes,
                }
            }),
        }

        expect(marshalledRelations)
            .toStrictEqual(expectedRelations)
    })
})
