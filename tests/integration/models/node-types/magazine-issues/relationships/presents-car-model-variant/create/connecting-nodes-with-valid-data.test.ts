import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›presents-car-model-variant‹ relationship with valid data', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    const createdRelationship = await MagazineIssue.createPresentsCarModelVariantRelationship(magazineIssue.properties.id, carModelVariant.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(magazineIssue.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MagazineIssuePresentsCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
