import {expect, test} from "vitest"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {FakeRacingSeries} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingSeries"
import type {RacingSeriesInput} from "../../../../../../../src/models/node-types/racing-series/types/RacingSeriesInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await RacingSeries.create(FakeRacingSeries.dbInput())
    await RacingSeries.update(node.attributes.id, {} as RacingSeriesInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
