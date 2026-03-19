import {describe, expect, test} from 'vitest'
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {getAllNodeTypes} from "../../../_toolbox/getAllNodeTypes"
import {marshalSingleNode} from "../../../../src/controllers/nodes/marshalSingleNode"
import {convertModelNodeToControllerNode} from "../../../../src/controllers/nodes/convertModelNodeToControllerNode"
import {convertStringToControllerNodeType} from "../../../_toolbox/convertStringToNodeType"

describe('Marshalling a node', () => {
    test.each(
        getAllNodeTypes().map(relType => [relType])
    )('marshalling a $0 node', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const modelNode = getFakeNode(nodeType).modelOutput
        const controllerNode = convertModelNodeToControllerNode(modelNode)
        const marshalledNode = marshalSingleNode(controllerNode)

        expect(marshalledNode.id)
            .toEqual(modelNode.attributes.id)

        expect(marshalledNode.attributes)
            .to.not.have.property('id')

        expect(marshalledNode.type)
            .toEqual(convertStringToControllerNodeType(nodeType))

        expect(marshalledNode.attributes)
            .to.have.property('created_at')

        expect(marshalledNode.attributes)
            .to.have.property('updated_at')

        expect(isFlatObject(marshalledNode.attributes))
            .toBe(true)

    })
})

function isFlatObject(data: any) {
    return Object.values(data).every(value => typeof value !== 'object' || value === null)
}
