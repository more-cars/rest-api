import {Given, world} from "@cucumber/cucumber"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import axios from "axios"

Given('there exists a relationship {string} between CAR MODEL {string} and BRAND {string}',
    async (relationshipLabel: string, carModelLabel: string, brandLabel: string) => {
        const carModel: CarModelNode = world.recallNode(carModelLabel)
        const brand: BrandNode = world.recallNode(brandLabel)

        const response = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
