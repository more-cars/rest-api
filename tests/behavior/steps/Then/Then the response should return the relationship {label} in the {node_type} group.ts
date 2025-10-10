import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain the relationship {string} in the {string} group',
    (label: string, node_type: string) => {
        const groupKey = node_type.toLowerCase().replace(' ', '_') + 's'

        assert(world.recallResponse().data.data[groupKey].data[0].data.relationship_id === world.recallRelationship(label).relationship_id,
            `Relationship not found in the response`
        )
    })
