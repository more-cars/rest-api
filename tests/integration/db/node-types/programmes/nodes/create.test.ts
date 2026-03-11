import {describe, expect, test} from 'vitest'
import {FakeProgramme} from "../../../../../_toolbox/fixtures/nodes/FakeProgramme"
import {createNode} from "../../../../../../src/db/node-types/programmes/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeProgramme.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeProgramme.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
