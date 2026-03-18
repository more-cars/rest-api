import {describe, expect, test} from 'vitest'
import {marshalNodeCollection} from "../../../../src/controllers/nodes/marshalNodeCollection"
import {convertModelNodeToControllerNode} from "../../../../src/controllers/nodes/convertModelNodeToControllerNode"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {NodeType} from "../../../../src/specification/NodeType"

describe('Marshalling a node collection', () => {
    test('when the result list is empty', async () => {
        const expectedTotalNodeCount = 0

        const marshalledNodeCollection = marshalNodeCollection([], {
            total: expectedTotalNodeCount,
        })

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(expectedTotalNodeCount)
    })

    test('when the result list is not empty', async () => {
        const nodeA = convertModelNodeToControllerNode(getFakeNode(NodeType.CarModel).modelOutput)
        const nodeB = convertModelNodeToControllerNode(getFakeNode(NodeType.RacingGame).modelOutput)
        const nodeC = convertModelNodeToControllerNode(getFakeNode(NodeType.RaceTrack).modelOutput)
        const expectedTotalNodeCount = 3

        const marshalledNodeCollection = marshalNodeCollection([nodeA, nodeB, nodeC], {
            total: expectedTotalNodeCount,
        })

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(expectedTotalNodeCount)
    })
})
