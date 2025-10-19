import {expect, test} from 'vitest'
import assert from "assert"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/controller/RelationshipSchema"

test('Both nodes and a ›has-car-model‹ relationship exist',
    async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        await Brand.createHasCarModelRelationship(brand.id, carModel.id)

        const relationship = await Brand.getSpecificHasCarModelRelationship(brand.id, carModel.id)

        if (!relationship) {
            assert.fail(`Relationship creation failed.`)
        }

        validateJson(relationship, RelationshipSchema)

        expect(relationship.origin.id)
            .toBe(brand.id)

        expect(relationship.destination.id)
            .toBe(carModel.id)
    })
