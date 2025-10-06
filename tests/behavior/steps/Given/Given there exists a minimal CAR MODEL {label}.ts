import {Given, world} from "@cucumber/cucumber"
import {seedCarModelMinimal} from "../../../_toolbox/dbSeeding/car-models/nodes/seedCarModelMinimal"

Given('there exists a minimal CAR MODEL {string}',
    async (label: string) => {
        world.rememberNode(await seedCarModelMinimal(), label, 'car model')
    })
