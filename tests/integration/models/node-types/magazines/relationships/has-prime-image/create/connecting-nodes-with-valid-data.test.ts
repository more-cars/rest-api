import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const image = await seedNode(DbNodeType.Image)

    const createdRelationship = await Magazine.createHasPrimeImageRelationship(magazine.properties.id, image.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(magazine.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MagazineHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
