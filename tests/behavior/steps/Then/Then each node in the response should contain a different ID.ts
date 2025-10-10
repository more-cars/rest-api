import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {removeDuplicates} from "../../../_toolbox/removeDuplicates"

Then('each node in the response should contain a different ID',
    () => {
        const nodes = world.recallResponse().data.data

        const extractedIds = nodes.map((node: any) => node.data.id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        assert.equal(extractedIds.length, deduplicatedIds.length)
    })
