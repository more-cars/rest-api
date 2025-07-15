import {Given} from "@cucumber/cucumber"
import {seedCarModelMinimal} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModelMinimal"

Given('there exists a minimal CAR MODEL {string}',
    async function (label: string) {
        this.carmodel[label] = await seedCarModelMinimal()
    })
