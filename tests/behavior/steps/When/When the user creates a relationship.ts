import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"

When('the user creates a relationship',
    async () => {
        const brand = await seedNode(DbNodeType.Brand)
        const carModel = await seedNode(DbNodeType.CarModel)

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.properties.id}/has-car-model/${carModel.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
