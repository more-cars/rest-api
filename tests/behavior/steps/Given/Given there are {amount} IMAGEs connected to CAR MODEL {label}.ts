import {Given, world} from "@cucumber/cucumber"
import {CarModelNode} from "../../../../src/models/car-models/types/CarModelNode"
import {
    seedCarModelHasImageRelationship
} from "../../../_toolbox/dbSeeding/car-models/relationships/seedCarModelHasImageRelationship"

Given('there are {int} IMAGEs connected to CAR MODEL {string}',
    async (amount: number, label: string) => {
        const carModel: CarModelNode = world.recallNode(label).data

        for (let i = 0; i < amount; i++) {
            await seedCarModelHasImageRelationship(carModel)
        }
    })
