import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should contain a {string} group',
    (nodeType: string) => {
        const groupKey = nodeType.toLowerCase().replace(' ', '_') + 's'

        assert(groupKey in world.recallResponse().data.data, `Field "${groupKey}" not found in the response`)
    })
