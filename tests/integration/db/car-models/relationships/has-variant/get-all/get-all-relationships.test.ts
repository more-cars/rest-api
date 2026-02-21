import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting all ›has-variant‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModel = await seedNode(ControllerNodeType.CarModel)
        await seedRelationshipForStartNode(carModel.properties.id, ControllerNodeType.CarModelVariant, RelationshipType.CarModelHasVariant)
        await seedRelationshipForStartNode(carModel.properties.id, ControllerNodeType.CarModelVariant, RelationshipType.CarModelHasVariant)

        const relationships = await getRelationshipCollection(
            carModel.properties.id,
            RelationshipType.CarModelHasVariant,
            DbNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModel = await seedNode(ControllerNodeType.CarModel)

        const relationships = await getRelationshipCollection(
            carModel.properties.id,
            RelationshipType.CarModelHasVariant,
            DbNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelHasVariant,
            DbNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
