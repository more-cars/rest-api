import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"

When('the user connects CAR MODEL {string} to BRAND {string} with the relationship name {string}',
    async (carModelLabel: string, brandLabel: string, relationshipName: string) => {
        const brand: BrandNode = world.recallNode(brandLabel).data
        const carModel: CarModelNode = world.recallNode(carModelLabel).data

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/${relationshipName}/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
