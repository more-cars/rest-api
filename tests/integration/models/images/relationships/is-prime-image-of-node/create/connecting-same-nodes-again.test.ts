import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›is-prime-image-of-node‹ relationship again', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const node = await seedNode(NodeTypeEnum.COMPANY)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.id, node.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.id, node.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
