import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {removeDuplicates} from "../../../_toolbox/removeDuplicates"

Then('all nodes of set {string} should have a different ID',
    (label: string) => {
        const nodes = world.recallNodeCollection(label)
        const extractedIds = nodes.data.map((node: any) => node.id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        assert.equal(extractedIds.length, deduplicatedIds.length)
    })
