import {When} from "@cucumber/cucumber"
import axios from "axios"
import {seedImage} from "../../dbSeeding/images/nodes/seedImage.ts"
import {seedBrand} from "../../dbSeeding/brands/nodes/seedBrand.ts"

When('the user connects a BRAND to an IMAGE',
    async function () {
        const image = await seedImage()
        const brand = await seedBrand()

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${brand.id}`)
            .catch(error => {
                console.error(error)
            })
    })
