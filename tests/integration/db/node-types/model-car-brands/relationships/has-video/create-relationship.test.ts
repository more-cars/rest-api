import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-video‹ relationship', () => {
    test('with valid data', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
        const video = await seedNode(DbNodeType.Video)

        const createdRelationship = await createRelationship(
            modelCarBrand.properties.id,
            video.properties.id,
            RelationshipType.ModelCarBrandHasVideo,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ModelCarBrandHasVideo)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', modelCarBrand.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', video.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        const createdRelationship = await createRelationship(
            modelCarBrand.properties.id,
            -42,
            RelationshipType.ModelCarBrandHasVideo,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
