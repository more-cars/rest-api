import {expect, test} from "vitest"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {FakeLapTime} from "../../../../../../_toolbox/fixtures/nodes/FakeLapTime"
import type {LapTimeInput} from "../../../../../../../src/models/node-types/lap-times/types/LapTimeInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await LapTime.create(FakeLapTime.dbInput())
    await LapTime.update(node.attributes.id, {} as LapTimeInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
