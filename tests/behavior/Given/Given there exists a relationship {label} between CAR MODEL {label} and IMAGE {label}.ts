import {Given} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode.ts"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode.ts"

Given('there exists a relationship {string} between CAR MODEL {string} and IMAGE {string}',
    async function (relationshipLabel: string, carModelLabel: string, imageLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]
        const image: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[relationshipLabel] = this.latestResponse.data
    })
