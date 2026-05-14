import {expect, test} from "vitest"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {FakeRacingSession} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import type {RacingSessionInput} from "../../../../../../../src/models/node-types/racing-sessions/types/RacingSessionInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await RacingSession.create(FakeRacingSession.dbInput())
    await RacingSession.update(node.attributes.id, {} as RacingSessionInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
