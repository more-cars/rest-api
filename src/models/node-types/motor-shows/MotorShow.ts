import {CreateMotorShowInput} from "./types/CreateMotorShowInput"
import {MotorShowNode} from "./types/MotorShowNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/motor-shows/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/motor-shows/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/motor-shows/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Image} from "../images/Image"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {ModelNodeType} from "../../types/ModelNodeType"

export const MotorShow = {
    async create(data: CreateMotorShowInput): Promise<MotorShowNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MotorShowNode
    },

    async findById(id: number): Promise<MotorShowNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MotorShowNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<MotorShowNode[]> {
        const nodes: MotorShowNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as MotorShowNode)
        })

        return nodes
    },

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createPresentsCarModelVariantRelationship(motorShowId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MotorShow.findById(motorShowId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(motorShowId, carModelVariantId, RelType.MotorShowPresentsCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MotorShowPresentsCarModelVariant, motorShowId, carModelVariantId)
        }

        const createdRelationship = await createRel(motorShowId, carModelVariantId, RelType.MotorShowPresentsCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllPresentsCarModelVariantRelationships(motorShowId: number) {
        // checking that the node exists -> exception is thrown if not
        await MotorShow.findById(motorShowId)

        return getAllRels(motorShowId, RelType.MotorShowPresentsCarModelVariant)
    },

    async deletePresentsCarModelVariantRelationship(motorShowId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MotorShow.findById(motorShowId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(motorShowId, carModelVariantId, RelType.MotorShowPresentsCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MotorShowPresentsCarModelVariant, motorShowId, carModelVariantId)
        }

        await deleteSpecificRel(motorShowId, carModelVariantId, RelType.MotorShowPresentsCarModelVariant)
    },

    async createHasImageRelationship(motorShowId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MotorShow.findById(motorShowId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(motorShowId, imageId, RelType.MotorShowHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MotorShowHasImage, motorShowId, imageId)
        }

        const createdRelationship = await createRel(motorShowId, imageId, RelType.MotorShowHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(motorShowId: number) {
        // checking that the node exists -> exception is thrown if not
        await MotorShow.findById(motorShowId)

        return getAllRels(motorShowId, RelType.MotorShowHasImage)
    },

    async deleteHasImageRelationship(motorShowId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MotorShow.findById(motorShowId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(motorShowId, imageId, RelType.MotorShowHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MotorShowHasImage, motorShowId, imageId)
        }

        await deleteSpecificRel(motorShowId, imageId, RelType.MotorShowHasImage)
    },

    async createHasPrimeImageRelationship(motorShowId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await MotorShow.findById(motorShowId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(motorShowId, imageId, RelType.MotorShowHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MotorShowHasPrimeImage, motorShowId, imageId)
        }
        await deleteOutgoingRel(motorShowId, RelType.MotorShowHasPrimeImage, ModelNodeType.Image)

        const createdRelationship = await createRel(motorShowId, imageId, RelType.MotorShowHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },
}
