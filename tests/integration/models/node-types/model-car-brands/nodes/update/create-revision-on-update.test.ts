import {expect, test} from "vitest"
import {ModelCarBrand} from "../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {FakeModelCarBrand} from "../../../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"
import type {ModelCarBrandInput} from "../../../../../../../src/models/node-types/model-car-brands/types/ModelCarBrandInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await ModelCarBrand.create(FakeModelCarBrand.dbInput())
    await ModelCarBrand.update(node.attributes.id, {} as ModelCarBrandInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
