import {describe, expect, test} from 'vitest'
import {FakeRaceTrack} from "../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRaceTrack.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.RaceTrack, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRaceTrack.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.RaceTrack, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
