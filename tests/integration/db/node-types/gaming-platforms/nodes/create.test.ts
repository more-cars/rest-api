import {describe, expect, test} from 'vitest'
import {FakeGamingPlatform} from "../../../../../_toolbox/fixtures/nodes/FakeGamingPlatform"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeGamingPlatform.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.GamingPlatform, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeGamingPlatform.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.GamingPlatform, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
