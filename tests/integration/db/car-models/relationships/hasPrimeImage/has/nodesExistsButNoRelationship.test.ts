import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Expecting an empty list when the relationship does not exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const relationship = await getSpecificRelationship(
        carModel.id,
        image.id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(relationship)
        .toBeFalsy()
})