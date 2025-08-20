import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {BaseNode} from "../../../src/db/types/BaseNode"
import {removeDuplicates} from "../../_toolbox/removeDuplicates"

Then('each node in the response should contain a different ID',
    () => {
        const nodes = world.recallResponse().data

        const extractedIds = nodes.map((node: BaseNode) => node.id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        assert.equal(extractedIds.length, deduplicatedIds.length)
    })
