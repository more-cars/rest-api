import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"

test('Requesting the relationship between BRAND and attached IMAGE',
    async () => {
        const brand = await seedBrand()
        const image = await seedImage()

        await createRelationship(
            brand.id,
            image.id,
            DbRelationship.NodeHasImage,
        )

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.NodeHasImage,
        )

        expect(relationships.length)
            .toBe(1)

        expect(relationships[0].start_node_id)
            .toBe(brand.id)

        expect(relationships[0].end_node_id)
            .toBe(image.id)
    })
