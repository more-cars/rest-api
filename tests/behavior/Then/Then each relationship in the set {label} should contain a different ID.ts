import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {BaseRelationship} from "../../../src/db/types/BaseRelationship"
import {removeDuplicates} from "../../_toolbox/removeDuplicates"

Then('each relationship in the set {string} should contain a different ID',
    function (label: string) {
        const relationships = this.relationships[label]

        const extractedIds = relationships.map((relationship: BaseRelationship) => relationship.relationship_id)
        const deduplicatedIds = removeDuplicates(extractedIds)

        assert.equal(extractedIds.length, deduplicatedIds.length)
    })
