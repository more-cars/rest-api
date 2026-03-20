import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const price = await seedNode(DbNodeType.Price)
    const image = await seedNode(DbNodeType.Image)

    await expect(Price.createHasPrimeImageRelationship(price.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Price.createHasPrimeImageRelationship(price.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
