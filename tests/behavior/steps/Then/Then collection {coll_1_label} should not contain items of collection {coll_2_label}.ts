import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"

Then('collection {string} should not contain items of collection {string}',
    (collectionOneLabel: string, collectionTwoLabel: string) => {
        const collectionOne = NodeManager.getNodeCollectionByLabel(collectionOneLabel)
        const collectionTwo = NodeManager.getNodeCollectionByLabel(collectionTwoLabel)

        const collectionOneIds = collectionOne.map((node: any) => node.data.id)
        const collectionTwoIds = collectionTwo.map((node: any) => node.data.id)

        const areBothCollectionsDistinct = collectionOneIds.every((id: number) => !collectionTwoIds.includes(id))

        assert.ok(areBothCollectionsDistinct)
    })
