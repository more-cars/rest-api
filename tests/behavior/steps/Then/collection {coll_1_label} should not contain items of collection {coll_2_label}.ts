import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"

Then('collection {string} should not contain items of collection {string}',
    (collectionOneLabel: string, collectionTwoLabel: string) => {
        const collectionOne = NodeManager.getNodeCollectionByLabel(collectionOneLabel)
        const collectionTwo = NodeManager.getNodeCollectionByLabel(collectionTwoLabel)

        const collectionOneIds = collectionOne.map((node) => node.fields.id)
        const collectionTwoIds = collectionTwo.map((node) => node.fields.id)

        const areBothCollectionsDistinct = collectionOneIds.every((id) => !collectionTwoIds.includes(id))

        assert.ok(areBothCollectionsDistinct)
    })
