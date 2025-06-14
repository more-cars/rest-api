import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {createRelationship} from "../../../../../../../src/db/createRelationship"
import {findRelationships} from "../../../../../../../src/db/findRelationships"
import {DbRelationship} from "../../../../../../../src/types/DbRelationship"

test('Requesting the relationship between CAR MODEL and attached BRAND',
    async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        await createRelationship(
            brand.id as number,
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
        )

        const relationships = await findRelationships(
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
            true
        )

        expect(relationships.length)
            .toBe(1)

        expect(relationships[0].start_node_id)
            .toBe(brand.id)

        expect(relationships[0].end_node_id)
            .toBe(carModel.id)
    })
