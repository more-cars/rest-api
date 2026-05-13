import {expect, test} from "vitest"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {FakeCarModelVariant} from "../../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import type {CarModelVariantInput} from "../../../../../../../src/models/node-types/car-model-variants/types/CarModelVariantInput"
import {Revision} from "../../../../../../../src/models/node-types/revisions/Revision"

test('Expecting REVISION to be created when updating a node', async () => {
    const node = await CarModelVariant.create(FakeCarModelVariant.dbInput())
    await CarModelVariant.update(node.attributes.id, {} as CarModelVariantInput)

    const revisionNodes = await Revision.findAll({
        filterByProperty: 'node_updated_at',
        filterValue: node.attributes.updated_at,
    })

    expect(revisionNodes.length)
        .toEqual(1)
})
