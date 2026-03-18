import {describe, expect, test} from 'vitest'
import {marshalNodeCollection} from "../../../../src/controllers/nodes/marshalNodeCollection"
import {convertModelNodeToControllerNode} from "../../../../src/controllers/nodes/convertModelNodeToControllerNode"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {NodeType} from "../../../../src/specification/NodeType"

describe('Expecting pagination meta information when marshalling a node collection', () => {
    test('when the result list is empty', async () => {
        const marshalledNodeCollection = marshalNodeCollection([], {
            current_page: 3,
            total: 10,
            page_size: 50,
        })

        expect(marshalledNodeCollection.data.length)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.current)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(50)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(10)

        expect(marshalledNodeCollection.meta.page.total_pages)
            .toEqual(1)
    })

    test('when the result list is not empty', async () => {
        const nodeA = convertModelNodeToControllerNode(getFakeNode(NodeType.CarModel).modelOutput)
        const nodeB = convertModelNodeToControllerNode(getFakeNode(NodeType.RacingGame).modelOutput)
        const nodeC = convertModelNodeToControllerNode(getFakeNode(NodeType.RaceTrack).modelOutput)

        const marshalledNodeCollection = marshalNodeCollection([nodeA, nodeB, nodeC], {
            current_page: 2,
            total: 3,
            page_size: 75,
        })

        expect(marshalledNodeCollection.data.length)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.current)
            .toEqual(2)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(75)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.total_pages)
            .toEqual(1)
    })

    test('when no meta information is provides', async () => {
        const marshalledNodeCollection = marshalNodeCollection([], {})

        expect(marshalledNodeCollection.data.length)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.current)
            .toEqual(1)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(100)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.total_pages)
            .toEqual(1)
    })
})
