import {expect, test} from "vitest"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {FakeCarModel} from "../../../../../../_toolbox/fixtures/nodes/FakeCarModel"
import type {CarModelInput} from "../../../../../../../src/models/node-types/car-models/types/CarModelInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await CarModel.create(FakeCarModel.dbInput())
    await CarModel.update(node.attributes.id, {} as CarModelInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
