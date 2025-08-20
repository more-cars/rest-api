import {When, world} from "@cucumber/cucumber"
import {seedRelationships} from "../../_toolbox/dbSeeding/brands/relationships/seedRelationships"

When('the user creates a set of {int} relationships {string}',
    async (amount: number, label: string) => {
        world.rememberRelationship(await seedRelationships(amount), label)
    })
