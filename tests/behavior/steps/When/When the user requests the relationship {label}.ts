import {When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests the relationship {string}',
    async (label: string) => {
        const relationshipId = world.recallRelationship(label).relationship_id

        const response = await axios
            .get(`${process.env.API_URL}/relationships/${relationshipId}`)

        world.rememberResponse(response)
    })
