import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalAll} from "./marshalAll"
import {sendResponse200} from "../responses/sendResponse200"

export async function getAll(req: express.Request, res: express.Response) {
    const nodes = await CarModel.findAll()
    const marshalledData = marshalAll(nodes)

    sendResponse200(marshalledData, res)
}
