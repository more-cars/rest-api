import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../src/models/racing-events/RacingEvent"
import {seedRacingEvent} from "../../../../_toolbox/dbSeeding/racing-events/nodes/seedRacingEvent"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a RACING EVENT', () => {
    test('that does not exist', async () => {
        await expect(RacingEvent.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedRacingEvent()
        await expect(RacingEvent.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
