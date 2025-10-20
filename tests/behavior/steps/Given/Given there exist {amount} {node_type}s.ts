import {Given} from "@cucumber/cucumber"
import assert from "assert"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {deleteAllCompanies} from "../../../_toolbox/dbSeeding/companies/nodes/deleteAllCompanies"
import {deleteAllBrands} from "../../../_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import {deleteAllCarModels} from "../../../_toolbox/dbSeeding/car-models/nodes/deleteAllCarModels"
import {deleteAllRaceTracks} from "../../../_toolbox/dbSeeding/race-tracks/nodes/deleteAllRaceTracks"
import {deleteAllImages} from "../../../_toolbox/dbSeeding/images/nodes/deleteAllImages"
import {seedCompanies} from "../../../_toolbox/dbSeeding/companies/nodes/seedCompanies"
import {seedBrands} from "../../../_toolbox/dbSeeding/brands/nodes/seedBrands"
import {seedCarModels} from "../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {seedRaceTracks} from "../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTracks"
import {seedImages} from "../../../_toolbox/dbSeeding/images/nodes/seedImages"

Given('there exist {int} {string}s', async function (amount: number, nodeType: NodeTypeEnum) {
    switch (nodeType.toLowerCase()) {
        case NodeTypeEnum.COMPANY:
            await deleteAllCompanies()
            await seedCompanies(amount)
            break
        case NodeTypeEnum.BRAND:
            await deleteAllBrands()
            await seedBrands(amount)
            break
        case NodeTypeEnum.CAR_MODEL:
            await deleteAllCarModels()
            await seedCarModels(amount)
            break
        case NodeTypeEnum.RACE_TRACK:
            await deleteAllRaceTracks()
            await seedRaceTracks(amount)
            break
        case NodeTypeEnum.IMAGE:
            await deleteAllImages()
            await seedImages(amount)
            break
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
})
