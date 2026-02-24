import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a LAP TIME', () => {
    test('which does not exist', async () => {
        await expect(LapTime.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedLapTime = await seedNode(DbNodeType.LapTime)
        const actualLapTime = await LapTime.findById(expectedLapTime.properties.id)

        expect(actualLapTime.attributes)
            .toEqual(expectedLapTime.properties)
    })
})
