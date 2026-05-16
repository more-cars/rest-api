import {expect, test} from "vitest"
import {ModelCar} from "../../../../../../../src/models/node-types/model-cars/ModelCar"
import {FakeModelCar} from "../../../../../../_toolbox/fixtures/nodes/FakeModelCar"
import type {ModelCarInput} from "../../../../../../../src/models/node-types/model-cars/types/ModelCarInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await ModelCar.create(FakeModelCar.dbInput())
    await ModelCar.update(node.attributes.id, {} as ModelCarInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
