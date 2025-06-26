import {When} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests the relationship {string}',
    async function (label: string) {
        const relationshipId = this.relationship[label].relationship_id

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/relationships/${relationshipId}`)
    })
