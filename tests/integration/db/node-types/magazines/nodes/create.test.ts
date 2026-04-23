import {describe, expect, test} from 'vitest'
import {FakeMagazine} from "../../../../../_toolbox/fixtures/nodes/FakeMagazine"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMagazine.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.Magazine, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMagazine.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.Magazine, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
