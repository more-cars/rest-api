import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('collection {string} should not contain items of collection {string}',
    (collectionOneLabel: string, collectionTwoLabel: string) => {
        const collectionOne = world.recallNodeCollection(collectionOneLabel).data.data
        const collectionTwo = world.recallNodeCollection(collectionTwoLabel).data.data

        const collectionOneIds = collectionOne.map((node: any) => node.data.id)
        const collectionTwoIds = collectionTwo.map((node: any) => node.data.id)

        const areBothCollectionsDistinct = collectionOneIds.every((id: number) => !collectionTwoIds.includes(id))

        assert.ok(areBothCollectionsDistinct)
    })
