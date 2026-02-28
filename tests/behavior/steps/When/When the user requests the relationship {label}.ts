import {When, world} from "@cucumber/cucumber"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests the relationship {string}',
    async (label: string) => {
        const relationshipId = world.recallRelationship(label).relationship_id
        const path = `/relationships/${relationshipId}`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
