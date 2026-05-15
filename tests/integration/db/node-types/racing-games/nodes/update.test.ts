import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeRacingGame} from "../../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputRacingGameCreate} from "../../../../../../src/db/node-types/racing-games/types/InputRacingGameCreate"
import type {RacingGameNode} from "../../../../../../src/db/node-types/racing-games/types/RacingGameNode"

describe('Updating RACING GAME', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.RacingGame)
        const inputData = FakeRacingGame.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.RacingGame, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.RacingGame)
        const inputData = createdNode.properties as unknown as InputRacingGameCreate
        const updatedNode = await updateDbNode(DbNodeType.RacingGame, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.RacingGame)
        const inputData = createdNode.properties as unknown as InputRacingGameCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.RacingGame, createdNode.properties.id, inputData) as RacingGameNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
