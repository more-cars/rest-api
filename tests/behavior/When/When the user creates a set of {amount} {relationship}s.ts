import {When} from "@cucumber/cucumber"
import {seedRelationships} from "../../_toolbox/dbSeeding/brands/relationships/seedRelationships"

When('the user creates a set of {int} relationships {string}',
    async function (amount: number, label: string) {
        this.relationships[label] = await seedRelationships(amount)
    })
