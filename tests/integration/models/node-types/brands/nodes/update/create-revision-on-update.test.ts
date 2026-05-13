import {expect, test} from "vitest"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {FakeBrand} from "../../../../../../_toolbox/fixtures/nodes/FakeBrand"
import type {BrandInput} from "../../../../../../../src/models/node-types/brands/types/BrandInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await Brand.create(FakeBrand.dbInput())
    await Brand.update(node.attributes.id, {} as BrandInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
