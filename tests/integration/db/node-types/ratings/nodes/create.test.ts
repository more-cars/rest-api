import {describe, expect, test} from 'vitest'
import {FakeRating} from "../../../../../_toolbox/fixtures/nodes/FakeRating"
import {createNode} from "../../../../../../src/db/node-types/ratings/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRating.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRating.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
