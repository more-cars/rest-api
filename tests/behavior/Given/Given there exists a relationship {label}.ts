import {When} from "@cucumber/cucumber"
import {seedRelationship} from "../../dbSeeding/brands/relationships/seedRelationship"

When('there exists a relationship {string}',
    async function (label: string) {
        this.relationship[label] = seedRelationship()
    })
