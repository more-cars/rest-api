import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../src/models/racing-sessions/RacingSession"
import {seedRacingSession} from "../../../../_toolbox/dbSeeding/racing-sessions/nodes/seedRacingSession"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a RACING SESSION', () => {
    test('that does not exist', async () => {
        await expect(RacingSession.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedRacingSession()
        await expect(RacingSession.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
