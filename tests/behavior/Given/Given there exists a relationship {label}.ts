import {When} from "@cucumber/cucumber"
import {seedRelationship} from "../../_toolbox/dbSeeding/brands/relationships/seedRelationship"

When('there exists a relationship {string}',
    async function (label: string) {
        this.relationship[label] = seedRelationship()
    })
