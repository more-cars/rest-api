import {When, world} from "@cucumber/cucumber"
import {seedRelationships} from "../../../_toolbox/dbSeeding/brands/relationships/seedRelationships"

When('the user creates a set of {int} relationships {string}',
    async (amount: number, label: string) => {
        // TODO seeding is not allowed in a "When" step -> needs to be a proper API call
        world.rememberRelationship(await seedRelationships(amount), label)
    })
