import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const image = await seedNode(DbNodeType.Image)

    await expect(ModelCarBrand.createHasImageRelationship(modelCarBrand.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ModelCarBrand.createHasImageRelationship(modelCarBrand.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
