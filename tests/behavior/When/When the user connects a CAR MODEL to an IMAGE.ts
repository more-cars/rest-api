import {When} from "@cucumber/cucumber"
import axios from "axios"
import {seedCarModel} from "../../dbSeeding/car-models/nodes/seedCarModel.ts"
import {seedImage} from "../../dbSeeding/images/nodes/seedImage.ts"

When('the user connects a CAR MODEL to an IMAGE',
    async function () {
        const image = await seedImage()
        const carModel = await seedCarModel()

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })
    })
