import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"

test('Requesting a relationship list for all CAR MODELs that are connected to the BRAND', async () => {
    const brand = await seedBrand()
    const carModels = await seedNodes(NodeTypeEnum.CAR_MODEL, 3)

    for (const carModel of carModels) {
        await createRelationship(
            brand.id,
            carModel.id,
            DbRelationship.BrandHasCarModel,
        )
    }

    const relationships = await getRelationshipCollection(
        brand.id,
        DbRelationship.BrandHasCarModel,
    )

    expect(relationships.length)
        .toBe(3)
})
