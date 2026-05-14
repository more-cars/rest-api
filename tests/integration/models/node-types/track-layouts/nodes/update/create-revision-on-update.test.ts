import {expect, test} from "vitest"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {FakeTrackLayout} from "../../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import type {TrackLayoutInput} from "../../../../../../../src/models/node-types/track-layouts/types/TrackLayoutInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await TrackLayout.create(FakeTrackLayout.dbInput())
    await TrackLayout.update(node.attributes.id, {} as TrackLayoutInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
