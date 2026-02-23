import {describe, expect, test} from 'vitest'
import {FakeTrackLayout} from "../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {createNode} from "../../../../../../src/db/node-types/track-layouts/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeTrackLayout.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeTrackLayout.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
