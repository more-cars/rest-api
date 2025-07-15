import {Given} from "@cucumber/cucumber"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"
import {
    seedCarModelHasImageRelationship
} from "../../_toolbox/dbSeeding/car-models/relationships/seedCarModelHasImageRelationship"

Given('there are {int} IMAGEs connected to CAR MODEL {string}',
    async function (amount: number, label: string) {
        const carModel: CarModelNode = this.carmodel[label]

        for (let i = 0; i < amount; i++) {
            await seedCarModelHasImageRelationship(carModel)
        }
    })
