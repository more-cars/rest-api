import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL cannot have multiple ›has-main-video‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await CarModel.createHasMainVideoRelationship(carModel.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(carModel.properties.id, RelationshipType.CarModelHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
