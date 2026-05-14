import {expect, test} from "vitest"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {FakeSessionResult} from "../../../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import type {SessionResultInput} from "../../../../../../../src/models/node-types/session-results/types/SessionResultInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await SessionResult.create(FakeSessionResult.dbInput())
    await SessionResult.update(node.attributes.id, {} as SessionResultInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
