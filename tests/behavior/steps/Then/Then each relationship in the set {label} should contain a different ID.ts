import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {BaseRelationship} from "../../../../src/db/types/BaseRelationship"
import {removeDuplicates} from "../../../_toolbox/removeDuplicates"

Then('each relationship in the set {string} should contain a different ID',
    (label: string) => {
        const relationships = world.recallRelationship(label)

        const extractedIds = relationships.map((relationship: BaseRelationship) => relationship.relationship_id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        assert.equal(extractedIds.length, deduplicatedIds.length)
    })
