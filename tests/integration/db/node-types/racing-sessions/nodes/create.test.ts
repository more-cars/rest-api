import {describe, expect, test} from 'vitest'
import {FakeRacingSession} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingSession.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.RacingSession, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingSession.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.RacingSession, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})