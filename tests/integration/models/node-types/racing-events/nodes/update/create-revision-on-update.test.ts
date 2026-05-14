import {expect, test} from "vitest"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {FakeRacingEvent} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import type {RacingEventInput} from "../../../../../../../src/models/node-types/racing-events/types/RacingEventInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await RacingEvent.create(FakeRacingEvent.dbInput())
    await RacingEvent.update(node.attributes.id, {} as RacingEventInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
