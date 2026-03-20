import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('Requesting a ›made-by-model-car-brand‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.ModelCar, DbNodeType.ModelCarBrand, RelationshipType.ModelCarMadeByModelCarBrand)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.ModelCarMadeByModelCarBrand,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        const relationships = await getRelationshipCollection(
            modelCar.properties.id,
            RelationshipType.ModelCarMadeByModelCarBrand,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ModelCarMadeByModelCarBrand,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
