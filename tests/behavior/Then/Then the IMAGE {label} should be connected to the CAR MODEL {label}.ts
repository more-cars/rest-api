import {Then} from "@cucumber/cucumber"
import assert from "assert"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

Then('the IMAGE {string} should be connected to the CAR MODEL {string}',
    async function (imageLabel: string, carModelLabel: string) {
        const image: ImageNode = this.image[imageLabel]
        const carModel: CarModelNode = this.carmodel[carModelLabel]

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Failed to fetch the car model belongs to brand relationship.')
        }

        assert(response.data.image_id === image.id)
    })
