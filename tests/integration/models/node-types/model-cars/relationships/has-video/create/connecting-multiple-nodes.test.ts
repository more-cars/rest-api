import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR can have multiple ›has-video‹ relationships', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await ModelCar.createHasVideoRelationship(modelCar.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCar.properties.id, RelationshipType.ModelCarHasVideo)

    expect(relationships.length)
        .toBe(videosAmount)
})
