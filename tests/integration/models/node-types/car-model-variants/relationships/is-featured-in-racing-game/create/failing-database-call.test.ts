import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const racingGame = await seedNode(DbNodeType.RacingGame)

    await expect(CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.properties.id, racingGame.properties.id))
        .rejects
        .toThrow(Error)
})
