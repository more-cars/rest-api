import {expect, test} from 'vitest'
import assert from "assert"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"

test('Both nodes and a ›has-car-model‹ relationship exist',
    async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        await Brand.createHasCarModelRelationship(brand.id, carModel.id)

        const relationship = await Brand.getSpecificHasCarModelRelationship(brand.id, carModel.id)

        if (!relationship) {
            assert.fail(`Relationship creation failed.`)
        }

        expect(validateJson(relationship, RelationshipSchema))
            .toBeTruthy()

        expect(relationship.origin.id)
            .toBe(brand.id)

        expect(relationship.destination.id)
            .toBe(carModel.id)
    })
