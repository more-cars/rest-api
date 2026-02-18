import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Brand.createHasImageRelationship(brand.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Brand.createHasImageRelationship(brand.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
