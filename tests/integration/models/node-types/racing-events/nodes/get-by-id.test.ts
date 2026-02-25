import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a RACING EVENT', () => {
    test('which does not exist', async () => {
        await expect(RacingEvent.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedRacingEvent = await seedNode(DbNodeType.RacingEvent)
        const actualRacingEvent = await RacingEvent.findById(expectedRacingEvent.properties.id)

        expect(actualRacingEvent.attributes)
            .toEqual(expectedRacingEvent.properties)
    })
})
