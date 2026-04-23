import {describe, expect, test} from 'vitest'
import {FakeSessionResult} from "../../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeSessionResult.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.SessionResult, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeSessionResult.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.SessionResult, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})