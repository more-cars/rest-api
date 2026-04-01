import {describe, expect, test} from 'vitest'
import {marshalHasPrimeImageNodeCollection} from "../../../../../src/controllers/nodes/marshalHasPrimeImageNodeCollection"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"
import {FakeImage} from "../../../../_toolbox/fixtures/nodes/FakeImage"
import type {ImageNode} from "../../../../../src/controllers/node-types/images/types/ImageNode"

describe('Marshalling a »get prime images« collection', () => {
    test('when there are no images', async () => {
        const marshalledNodeCollection = marshalHasPrimeImageNodeCollection([])

        expect(marshalledNodeCollection.data)
            .to.have.lengthOf(0)
    })

    test('when there are images', async () => {
        const node = {
            node_type: ControllerNodeType.Image,
            fields: FakeImage.modelOutput.attributes,
        } as ImageNode

        const marshalledNodeCollection = marshalHasPrimeImageNodeCollection([node, node, node])

        expect(marshalledNodeCollection.data)
            .to.have.lengthOf(3)
    })
})
