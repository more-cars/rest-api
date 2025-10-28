import {CreateLapTimeInput} from "./types/CreateLapTimeInput"
import {LapTimeNode} from "./types/LapTimeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/lap-times/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/lap-times/getNodeById"
import {getAllNodesOfType} from "../../db/nodes/lap-times/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../types/NodeCollectionConstraints"
import {deleteNode} from "../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../types/NodeNotFoundError"
import {createRel} from "../relationships/createRel"
import {DbRelationship} from "../../db/types/DbRelationship"
import {deleteDeprecatedRelationship} from "../relationships/deleteDeprecatedRelationship"
import {SessionResult} from "../session-results/SessionResult"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {LapTimeRelationship} from "./types/LapTimeRelationship"

export class LapTime {
    static async create(data: CreateLapTimeInput): Promise<LapTimeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | LapTimeNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }

    static async findAll(options: NodeCollectionConstraints = {}): Promise<LapTimeNode[]> {
        const nodes: Array<LapTimeNode> = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    }

    static async delete(lapTimeId: number): Promise<void> {
        const node = await LapTime.findById(lapTimeId)
        if (!node) {
            throw new NodeNotFoundError(lapTimeId)
        }

        await deleteNode(lapTimeId)
    }

    static async createBelongsToSessionResultRelationship(lapTimeId: number, sessionResultId: number) {

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const existingRelation = await getSpecificRel(lapTimeId, sessionResultId, RelationshipType.LapTimeBelongsToSessionResult)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(LapTimeRelationship.belongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteDeprecatedRelationship(lapTimeId, DbRelationship.LapTimeBelongsToSessionResult)

        const createdRelationship = await createRel(lapTimeId, sessionResultId, RelationshipType.LapTimeBelongsToSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }
}
