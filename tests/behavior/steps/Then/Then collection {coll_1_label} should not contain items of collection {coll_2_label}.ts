import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {BaseNode} from "../../../../src/db/types/BaseNode"

Then('collection {string} should not contain items of collection {string}',
    (collectionOneLabel: string, collectionTwoLabel: string) => {
        const collectionOne = world.recallNodeCollection(collectionOneLabel).data
        const collectionTwo = world.recallNodeCollection(collectionTwoLabel).data

        const collectionOneIds = collectionOne.map((node: BaseNode) => node.id)
        const collectionTwoIds = collectionTwo.map((node: BaseNode) => node.id)

        const areBothCollectionsDistinct = collectionOneIds.every((id: number) => !collectionTwoIds.includes(id))

        assert.ok(areBothCollectionsDistinct)
    })
