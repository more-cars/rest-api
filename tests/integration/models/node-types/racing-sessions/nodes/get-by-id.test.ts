import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a RACING SESSION', () => {
    test('which does not exist', async () => {
        await expect(RacingSession.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedRacingSession = await seedNode(DbNodeType.RacingSession)
        const actualRacingSession = await RacingSession.findById(expectedRacingSession.properties.id)

        expect(actualRacingSession.attributes)
            .toEqual(expectedRacingSession.properties)
    })
})
