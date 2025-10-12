import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../../src/models/images/Image"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-node‹ relationship again', async () => {
    const image = await seedImage()
    const carModel = await seedCarModel()

    await expect(Image.createBelongsToNodeRelationship(image.id, carModel.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Image.createBelongsToNodeRelationship(image.id, carModel.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
