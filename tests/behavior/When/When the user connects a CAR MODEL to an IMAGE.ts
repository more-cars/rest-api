import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedCarModel} from "../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedImage} from "../../_toolbox/dbSeeding/images/nodes/seedImage"

When('the user connects a CAR MODEL to an IMAGE',
    async () => {
        const image = await seedImage()
        const carModel = await seedCarModel()

        const response = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
