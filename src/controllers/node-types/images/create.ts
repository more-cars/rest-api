import express from "express"
import {getNodeTypeSpecification} from "../../../specification/getNodeTypeSpecification"
import {NodeType} from "../../../specification/NodeType"
import {unmarshalInputData} from "../../nodes/unmarshalInputData"
import {CreateImageInput} from "../../../models/node-types/images/types/CreateImageInput"
import {validateInputData} from "../../nodes/validateInputData"
import {Image} from "../../../models/node-types/images/Image"
import {convertImageModelNodeToControllerNode} from "./convertImageModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import {FlickrImageAlreadyExistsError} from "../../../models/types/FlickrImageAlreadyExistsError"
import {WikimediaImageAlreadyExistsError} from "../../../models/types/WikimediaImageAlreadyExistsError"
import {FlickrImageNotFoundError} from "../../../models/types/FlickrImageNotFoundError"
import {WikimediaImageNotFoundError} from "../../../models/types/WikimediaImageNotFoundError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse409} from "../../responses/sendResponse409"
import {sendResponse422} from "../../responses/sendResponse422"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const propertyNames = getNodeTypeSpecification(NodeType.Image)
        .properties
        .filter(prop => prop.scope !== 'system')
        .map(prop => prop.name)
    const data = unmarshalInputData(req.body, propertyNames) as CreateImageInput

    if (!validateInputData(data, NodeType.Image)) {
        return sendResponse400(res)
    }

    try {
        const modelNode = await Image.create(data)
        const node = convertImageModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof WikimediaImageNotFoundError || e instanceof FlickrImageNotFoundError) {
            return sendResponse422(res)
        } else if (e instanceof WikimediaImageAlreadyExistsError || e instanceof FlickrImageAlreadyExistsError) {
            return sendResponse409(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
