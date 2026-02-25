import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../../src/models/node-types/images/Image"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-prime-image-of-node‹ relationship again', async () => {
    const image = await seedNode(DbNodeType.Image)
    const node = await seedNode(DbNodeType.Company)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.properties.id, node.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Image.createIsPrimeImageOfNodeRelationship(image.properties.id, node.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
