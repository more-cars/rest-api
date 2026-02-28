import {When} from "@cucumber/cucumber"
import {performApiRequest} from "../../lib/performApiRequest"
import {RelationshipManager} from "../../lib/RelationshipManager"

When('the user requests the relationship {string}',
    async (label: string) => {
        const relationship = RelationshipManager.getRelationshipByLabel(label)
        const path = `/relationships/${relationship.data.relationship_id}`

        await performApiRequest(path, 'GET')
    })
