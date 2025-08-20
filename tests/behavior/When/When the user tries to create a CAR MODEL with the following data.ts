import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user tries to create a CAR MODEL with the following data',
    async (dataTable: DataTable) => {
        const nameRow = dataTable.hashes()[0]

        const carModelData = {
            [nameRow.attribute]: nameRow.value,
        }

        const response = await axios
            .post(`${process.env.API_URL}/car-models`, carModelData)

        world.rememberResponse(response)
    })
