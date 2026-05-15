import {expect, test} from "vitest"
import {MotorShow} from "../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {FakeMotorShow} from "../../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import type {MotorShowInput} from "../../../../../../../src/models/node-types/motor-shows/types/MotorShowInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await MotorShow.create(FakeMotorShow.dbInput())
    await MotorShow.update(node.attributes.id, {} as MotorShowInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
