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
            data: [{
                type: relationA.to_node.node_type,
                id: relationA.to_node.fields.id,
                attributes: (({id, ...fields}) => fields)(relationA.to_node.fields),
                data: {
                    relationship_id: relationA.id,
                    relationship_name: relationA.type,
                    start_node: {
                        node_type: relationA.from_node.node_type,
                        data: relationA.from_node.fields
                    },
                    partner_node: {
                        node_type: relationA.to_node.node_type,
                        data: relationA.to_node.fields
                    },
                    created_at: relationA.created_at,
                    updated_at: relationA.updated_at,
                },
            }, {
                type: relationB.to_node.node_type,
                id: relationB.to_node.fields.id,
                attributes: (({id, ...fields}) => fields)(relationB.to_node.fields),
                data: {
                    relationship_id: relationB.id,
                    relationship_name: relationB.type,
                    start_node: {
                        node_type: relationB.from_node.node_type,
                        data: relationB.from_node.fields
                    },
                    partner_node: {
                        node_type: relationB.to_node.node_type,
                        data: relationB.to_node.fields,
                    },
                    created_at: relationB.created_at,
                    updated_at: relationB.updated_at,
                },
            }, {
                type: relationC.to_node.node_type,
                id: relationC.to_node.fields.id,
                attributes: (({id, ...fields}) => fields)(relationC.to_node.fields),
                data: {
                    relationship_id: relationC.id,
                    relationship_name: relationC.type,
                    start_node: {
                        node_type: relationC.from_node.node_type,
                        data: relationC.from_node.fields
                    },
                    partner_node: {
                        node_type: relationC.to_node.node_type,
                        data: relationC.to_node.fields,
                    },
                    created_at: relationC.created_at,
                    updated_at: relationC.updated_at,
                },
            }],
        }

        expect(marshalledRelations)
            .toStrictEqual(expectedRelations)
    })
})
