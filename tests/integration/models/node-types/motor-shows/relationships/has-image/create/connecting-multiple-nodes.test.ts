import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MOTOR SHOW can have multiple ›has-image‹ relationships', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await MotorShow.createHasImageRelationship(motorShow.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(motorShow.properties.id, RelationshipType.MotorShowHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
