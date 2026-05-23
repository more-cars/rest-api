import {describe, expect, test} from 'vitest'
import {getAllModelRelationshipTypes} from "../../../_toolbox/getAllModelRelationshipTypes"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {ExpectedNodeType} from "../../../_toolbox/types/ExpectedNodeType"
import {convertStringToControllerNodeType} from "../../../_toolbox/convertStringToNodeType"
import {mapModelRelationTypeToControllerRelationType} from "../../../../src/controllers/relations/mapModelRelationTypeToControllerRelationType"
import {marshalEmptyRelation} from "../../../../src/controllers/relations/marshalEmptyRelation"
import {validateJson} from "../../../_toolbox/validateJson"
import {RelationshipEmptySchema} from "../../../_toolbox/schemas/response/RelationshipEmptySchema"

describe('Marshalling empty relation', () => {
    test.each(
        getAllModelRelationshipTypes().map(relType => [relType])
    )('$0', async (relType) => {
        const origin = getFakeNode(ExpectedNodeType.Brand).modelOutput()
        const startNodeType = convertStringToControllerNodeType(origin.node_type)
        const startNodeId = origin.attributes.id
        const relationType = mapModelRelationTypeToControllerRelationType(relType)
        const marshalledRelation = marshalEmptyRelation(startNodeType, startNodeId, relationType)

        // schema check
        expect(validateJson(marshalledRelation, RelationshipEmptySchema))
            .toBeTruthy()

        // data check
        expect(marshalledRelation)
            .toStrictEqual({
                links: {
                    self: `/${startNodeType}/${startNodeId}/${relationType}`,
                },
                data: null,
            })
    })
})
