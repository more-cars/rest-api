import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {NodeManager} from "../../lib/NodeManager"
import {removeDuplicates} from "../../../_toolbox/removeDuplicates"

Then('all nodes of set {string} should have a different ID',
    (label: string) => {
        const nodes = NodeManager.getNodeCollectionByLabel(label)
        const extractedIds = nodes.map((node) => node.fields.id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        assert.equal(extractedIds.length, deduplicatedIds.length)
    })
