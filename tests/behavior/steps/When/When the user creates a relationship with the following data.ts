import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"
import {seedNode} from "../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"

When('the user creates a relationship with the following data',
    async (dataTable: DataTable) => {
        const brand = await seedNode(ControllerNodeType.Brand)
        const carModel = await seedNode(ControllerNodeType.CarModel)
        const rows = dataTable.hashes()
        const data: any = {}

        rows.forEach((row) => {
            data[row.key] = row.value
        })

        const response = await axios
            .post(`${process.env.API_URL}/brands/${brand.properties.id}/has-car-model/${carModel.properties.id}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
