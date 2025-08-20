import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

Given('there exists a relationship {string} between CAR MODEL {string} and IMAGE {string}',
    async (relationshipLabel: string, carModelLabel: string, imageLabel: string) => {
        const carModel: CarModelNode = world.recallNode(carModelLabel)
        const image: ImageNode = world.recallNode(imageLabel)

        const response = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
