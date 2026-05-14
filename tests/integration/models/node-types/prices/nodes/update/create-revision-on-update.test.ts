import {expect, test} from "vitest"
import {Price} from "../../../../../../../src/models/node-types/prices/Price"
import {FakePrice} from "../../../../../../_toolbox/fixtures/nodes/FakePrice"
import type {PriceInput} from "../../../../../../../src/models/node-types/prices/types/PriceInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await Price.create(FakePrice.dbInput())
    await Price.update(node.attributes.id, {} as PriceInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
