import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const racingSession = await seedNode(DbNodeType.RacingSession)
    const image = await seedNode(DbNodeType.Image)

    await expect(RacingSession.createHasPrimeImageRelationship(racingSession.properties.id, image.properties.id))
        .rejects
        .toThrow(Error)
})
