import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(ControllerNodeType.Brand)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(Brand.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasImageRelationship(brand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
