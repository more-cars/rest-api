import {CreateCarModelVariantInput} from "./types/CreateCarModelVariantInput"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-model-variants/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/car-model-variants/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/car-model-variants/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {CarModel} from "../car-models/CarModel"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {CarModelVariantRelationship} from "./types/CarModelVariantRelationship"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {SessionResult} from "../session-results/SessionResult"
import {getAllRels} from "../relationships/getAllRels"

export class CarModelVariant {
    static async create(data: CreateCarModelVariantInput): Promise<CarModelVariantNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | CarModelVariantNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<CarModelVariantNode[]> {
        const nodes: Array<CarModelVariantNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(carModelVariantId: number): Promise<void> {
        const node = await CarModelVariant.findById(carModelVariantId)
        if (!node) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        await deleteNode(carModelVariantId)
    }

    static async createIsVariantOfRelationship(carModelVariantId: number, carModelId: number) {

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const existingRelation = await getSpecificRel(carModelVariantId, carModelId, RelationshipType.CarModelVariantIsVariantOf)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelVariantRelationship.isVariantOf, carModelVariantId, carModelId)
        }

        await deleteDeprecatedRel(carModelVariantId, DbRelationship.CarModelVariantIsVariantOf, NodeTypeLabel.CarModel)

        const createdRelationship = await createRel(carModelVariantId, carModelId, RelationshipType.CarModelVariantIsVariantOf)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getIsVariantOfRelationship(carModelVariantId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const relationship = await getRel(carModelVariantId, RelationshipType.CarModelVariantIsVariantOf, NodeTypeLabel.CarModel)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelVariantRelationship.isVariantOf, carModelVariantId, null)
        }

        return relationship
    }

    static async deleteIsVariantOfRelationship(carModelVariantId: number, carModelId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const carModel = await CarModel.findById(carModelId)
        if (!carModel) {
            throw new NodeNotFoundError(carModelId)
        }

        const relationship = await getSpecificRel(carModelVariantId, carModelId, RelationshipType.CarModelVariantIsVariantOf)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelVariantRelationship.isVariantOf, carModelVariantId, carModelId)
        }

        await deleteSpecificRel(carModelVariantId, carModelId, RelationshipType.CarModelVariantIsVariantOf)
    }

    static async createAchievedSessionResultRelationship(carModelVariantId: number, sessionResultId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const existingRelation = await getSpecificRel(carModelVariantId, sessionResultId, RelationshipType.CarModelVariantAchievedSessionResult)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(CarModelVariantRelationship.achievedSessionResult, carModelVariantId, sessionResultId)
        }

        await deleteDeprecatedRel(sessionResultId, DbRelationship.CarModelVariantAchievedSessionResult, NodeTypeLabel.CarModelVariant)

        const createdRelationship = await createRel(carModelVariantId, sessionResultId, RelationshipType.CarModelVariantAchievedSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAllAchievedSessionResultRelationships(carModelVariantId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        return getAllRels(carModelVariantId, RelationshipType.CarModelVariantAchievedSessionResult)
    }

    static async deleteAchievedSessionResultRelationship(carModelVariantId: number, sessionResultId: number) {
        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getSpecificRel(carModelVariantId, sessionResultId, RelationshipType.CarModelVariantAchievedSessionResult)
        if (!relationship) {
            throw new RelationshipNotFoundError(CarModelVariantRelationship.achievedSessionResult, carModelVariantId, sessionResultId)
        }

        await deleteSpecificRel(carModelVariantId, sessionResultId, RelationshipType.CarModelVariantAchievedSessionResult)
    }
}
