import {describe, expect, test} from 'vitest'
import {marshalNodeCollection} from "../../../../src/controllers/nodes/marshalNodeCollection"
import {convertModelNodeToControllerNode} from "../../../../src/controllers/nodes/convertModelNodeToControllerNode"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {ExpectedNodeType} from "../../../_toolbox/types/ExpectedNodeType"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"

describe('Expecting pagination meta information when marshalling a node collection', () => {
    test('when the result list is empty', async () => {
        const marshalledNodeCollection = marshalNodeCollection(ControllerNodeType.CarModel, [], {page: 3}, 10)

        expect(marshalledNodeCollection.data.length)
            .toEqual(0)

        expect(marshalledNodeCollection.meta.page.current)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(100)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(10)

        expect(marshalledNodeCollection.meta.page.total_pages)
            .toEqual(1)
    })

    test('when the result list is not empty', async () => {
        const nodeA = convertModelNodeToControllerNode(getFakeNode(ExpectedNodeType.CarModel).modelOutput)
        const nodeB = convertModelNodeToControllerNode(getFakeNode(ExpectedNodeType.CarModel).modelOutput)
        const nodeC = convertModelNodeToControllerNode(getFakeNode(ExpectedNodeType.CarModel).modelOutput)

        const marshalledNodeCollection = marshalNodeCollection(ControllerNodeType.CarModel, [nodeA, nodeB, nodeC], {page: 2}, 3)

        expect(marshalledNodeCollection.data.length)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.current)
            .toEqual(2)

        expect(marshalledNodeCollection.meta.page.size)
            .toEqual(100)

        expect(marshalledNodeCollection.meta.page.total_nodes)
            .toEqual(3)

        expect(marshalledNodeCollection.meta.page.total_pages)
            .toEqual(1)
    })

    test('when no meta information is provided', async () => {
        const marshalledNodeCollection = marshalNodeCollection(ControllerNodeType.Magazine, [], {}, 0)

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
