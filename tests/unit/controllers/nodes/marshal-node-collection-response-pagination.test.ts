import {describe, expect, test} from 'vitest'
import {marshalNodeCollection} from "../../../../src/controllers/nodes/marshalNodeCollection"
import {convertModelNodeToControllerNode} from "../../../../src/controllers/nodes/convertModelNodeToControllerNode"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {NodeType} from "../../../../src/specification/NodeType"

describe('Expecting pagination meta information when marshalling a node collection', () => {
    test('when the result list is empty', async () => {
        const marshalledNodeCollection = marshalNodeCollection([], {
            total: 0,
            page_size: 50,
        })

        expect(marshalledNodeCollection.data.length)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(50)
    })

    test('when the result list is not empty', async () => {
        const nodeA = convertModelNodeToControllerNode(getFakeNode(NodeType.CarModel).modelOutput)
        const nodeB = convertModelNodeToControllerNode(getFakeNode(NodeType.RacingGame).modelOutput)
        const nodeC = convertModelNodeToControllerNode(getFakeNode(NodeType.RaceTrack).modelOutput)

        const marshalledNodeCollection = marshalNodeCollection([nodeA, nodeB, nodeC], {
            total: 3,
            page_size: 75,
        })

        expect(marshalledNodeCollection.data.length)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(75)
    })

    test('when no meta information is provides', async () => {
        const marshalledNodeCollection = marshalNodeCollection([], {})

        expect(marshalledNodeCollection.data.length)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(100)
    })
})
