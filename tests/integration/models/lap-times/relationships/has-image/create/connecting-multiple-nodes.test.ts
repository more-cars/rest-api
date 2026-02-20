import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A LAP TIME can have multiple ›has-image‹ relationships', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await LapTime.createHasImageRelationship(lapTime.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.id,
        RelationshipType.LapTimeHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
