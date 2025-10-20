import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes exist, but have no relationship', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Brand.deleteHasImageRelationship(brand.id, image.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
