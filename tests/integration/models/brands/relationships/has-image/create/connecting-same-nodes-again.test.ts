import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(Brand.createHasImageRelationship(brand.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Brand.createHasImageRelationship(brand.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
