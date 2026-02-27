import {describe, expect, test} from 'vitest'
import {FakeGamingPlatform} from "../../../../../_toolbox/fixtures/nodes/FakeGamingPlatform"
import {createNode} from "../../../../../../src/db/node-types/gaming-platforms/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeGamingPlatform.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeGamingPlatform.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
