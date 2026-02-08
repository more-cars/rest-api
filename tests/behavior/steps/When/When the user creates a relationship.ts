import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"

When('the user creates a relationship',
    async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
