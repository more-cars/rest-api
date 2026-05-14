import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {FakeRacingSeries} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import type {RacingSeriesInput} from "../../../../../../../src/models/node-types/racing-series/types/RacingSeriesInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a RACING SERIES', () => {
    test('Node does not exist', async () => {
        await expect(RacingSeries.update(-42, FakeRacingSeries.dbInput() as RacingSeriesInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSeries)
        const inputData = FakeRacingSeries.dbInput()
        const updatedNode = await RacingSeries.update(createdNode.properties.id, inputData as RacingSeriesInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSeries)
        const validData = FakeRacingSeries.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await RacingSeries.update(createdNode.properties.id, inputData as RacingSeriesInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
