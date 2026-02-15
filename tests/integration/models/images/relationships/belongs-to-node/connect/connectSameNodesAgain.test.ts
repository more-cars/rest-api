import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-node‹ relationship again', async () => {
    const image = await seedNode(NodeTypeEnum.IMAGE)
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    await expect(Image.createBelongsToNodeRelationship(image.id, carModel.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Image.createBelongsToNodeRelationship(image.id, carModel.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
