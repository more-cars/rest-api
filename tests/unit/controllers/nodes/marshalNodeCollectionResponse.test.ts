import {describe, expect, test} from 'vitest'
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {getAllNodeTypes} from "../../../_toolbox/getAllNodeTypes"
import {convertModelNodeToControllerNode} from "../../../../src/controllers/nodes/convertModelNodeToControllerNode"
import {marshalNodeCollection} from "../../../../src/controllers/nodes/marshalNodeCollection"

describe('Marshalling a node collection', () => {
    test.each(
        getAllNodeTypes().map(relType => [relType])
    )('marshalling a $0 node collection', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const nodeA = convertModelNodeToControllerNode(getFakeNode(nodeType).modelOutput)
        const nodeB = convertModelNodeToControllerNode(getFakeNode(nodeType).modelOutput)
        const nodeC = convertModelNodeToControllerNode(getFakeNode(nodeType).modelOutput)

        const marshalledNodeCollection = marshalNodeCollection([nodeA, nodeB, nodeC])

        expect(marshalledNodeCollection.data)
            .to.have.lengthOf(3)

        expect(marshalledNodeCollection.data[0].id)
            .toEqual(nodeA.fields.id)

        expect(marshalledNodeCollection.data[1].id)
            .toEqual(nodeB.fields.id)

        expect(marshalledNodeCollection.data[2].id)
            .toEqual(nodeC.fields.id)
    })
})
