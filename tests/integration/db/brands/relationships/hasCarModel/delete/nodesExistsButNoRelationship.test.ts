import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Expecting an empty list when the relationship does not exist', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    const relationship = await deleteSpecificRelationship(
        brand.id,
        carModel.id,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationship)
        .toBeFalsy()
})