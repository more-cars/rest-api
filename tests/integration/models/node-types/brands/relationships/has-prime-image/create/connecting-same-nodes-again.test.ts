import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const image = await seedNode(DbNodeType.Image)

    await expect(Brand.createHasPrimeImageRelationship(brand.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Brand.createHasPrimeImageRelationship(brand.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
