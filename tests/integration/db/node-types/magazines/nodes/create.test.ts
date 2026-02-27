import {describe, expect, test} from 'vitest'
import {FakeMagazine} from "../../../../../_toolbox/fixtures/nodes/FakeMagazine"
import {createNode} from "../../../../../../src/db/node-types/magazines/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMagazine.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMagazine.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
