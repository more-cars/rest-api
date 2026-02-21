import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-prime-image-of-node‹ relationship again', async () => {
    const image = await seedNode(ControllerNodeType.Image)
    const node = await seedNode(ControllerNodeType.Company)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.properties.id, node.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.properties.id, node.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
