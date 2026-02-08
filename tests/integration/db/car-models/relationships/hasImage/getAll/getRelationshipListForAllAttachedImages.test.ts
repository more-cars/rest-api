import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Requesting a relationship list for all IMAGEs that are connected to the BRAND', async () => {
    const carModel = await seedCarModel()
    const images = await seedNodes(NodeTypeEnum.IMAGE, 3)

    for (const image of images) {
        await createRelationship(
            carModel.id,
            image.id,
            DbRelationship.NodeHasImage,
        )
    }

    const relationships = await getRelationshipCollection(
        carModel.id,
        DbRelationship.NodeHasImage,
    )

    expect(relationships.length)
        .toBe(3)
})
