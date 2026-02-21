import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"

When('the user creates a relationship',
    async () => {
        const brand = await seedNode(ControllerNodeType.Brand)
        const carModel = await seedNode(ControllerNodeType.CarModel)

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.properties.id}/has-car-model/${carModel.properties.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
