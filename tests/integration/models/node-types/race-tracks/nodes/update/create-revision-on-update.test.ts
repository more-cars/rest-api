import {expect, test} from "vitest"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {FakeRaceTrack} from "../../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import type {RaceTrackInput} from "../../../../../../../src/models/node-types/race-tracks/types/RaceTrackInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await RaceTrack.create(FakeRaceTrack.dbInput())
    await RaceTrack.update(node.attributes.id, {} as RaceTrackInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
