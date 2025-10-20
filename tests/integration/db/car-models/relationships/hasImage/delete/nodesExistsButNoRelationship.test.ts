import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Expecting an empty list when the relationship does not exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const relationship = await deleteSpecificRelationship(
        carModel.id,
        image.id,
        DbRelationship.CarModelHasImage,
    )

    expect(relationship)
        .toBeFalsy()
})