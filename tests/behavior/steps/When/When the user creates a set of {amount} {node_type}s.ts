import {When, world} from "@cucumber/cucumber"
import {Company} from "../../../../src/models/companies/Company"
import {Brand} from "../../../../src/models/brands/Brand"
import {CarModel} from "../../../../src/models/car-models/CarModel"
import {Image} from "../../../../src/models/images/Image"
import FakeCompany from "../../../_toolbox/fixtures/nodes/FakeCompany"
import FakeBrand from "../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImage from "../../../_toolbox/fixtures/nodes/FakeImage"

When('the user creates a set of {int} {string}s',
    async (amount: number, nodeType: string) => {
        const nodes = []

        // TODO this approach is not scalable, and it is cheating because we are circumventing the API -> needs to be an explicit API call
        for (let i = 0; i < amount; i++) {
            let node

            switch (nodeType.toLowerCase()) {
                case 'company':
                    node = await Company.create(FakeCompany)
                    break
                case 'brand':
                    node = await Brand.create(FakeBrand)
                    break
                case 'car model':
                    node = await CarModel.create(FakeCarModel)
                    break
                case 'image':
                    node = await Image.create(FakeImage)
                    break
            }

            nodes.push({
                data: node
            })
        }
        const response = {
            data: { // axios payload
                data: nodes // mc payload
            }
        }

        world.rememberResponse(response)
    })
