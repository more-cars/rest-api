import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-prime-image-of-node‹ relationship with nodes that do not exist', async () => {
    const image = await seedNode(DbNodeType.Image)
    const node = await seedNode(DbNodeType.Company)

    await expect(Image.createIsPrimeImageOfNodeRelationship(-42, node.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Image.createIsPrimeImageOfNodeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
