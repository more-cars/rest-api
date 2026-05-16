import {expect, test} from "vitest"
import {Magazine} from "../../../../../../../src/models/node-types/magazines/Magazine"
import {FakeMagazine} from "../../../../../../_toolbox/fixtures/nodes/FakeMagazine"
import type {MagazineInput} from "../../../../../../../src/models/node-types/magazines/types/MagazineInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await Magazine.create(FakeMagazine.dbInput())
    await Magazine.update(node.attributes.id, {} as MagazineInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
