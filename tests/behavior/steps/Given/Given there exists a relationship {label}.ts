import {When, world} from "@cucumber/cucumber"
import {seedRelationship} from "../../../_toolbox/dbSeeding/brands/relationships/seedRelationship"

When('there exists a relationship {string}',
    async (label: string) => {
        world.rememberRelationship(seedRelationship(), label)
    })
