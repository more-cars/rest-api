import {describe, expect, test} from 'vitest'
import {FakeImage} from "../../../../../_toolbox/fixtures/nodes/FakeImage"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"


describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeImage.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.Image, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeImage.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.Image, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})