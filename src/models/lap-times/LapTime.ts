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
import {deleteDeprecatedRel} from "../relationships/deleteDeprecatedRel"
import {SessionResult} from "../session-results/SessionResult"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {LapTimeRelationship} from "./types/LapTimeRelationship"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {Image} from "../images/Image"
import {getAllRels} from "../relationships/getAllRels"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"

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

        await deleteDeprecatedRel(lapTimeId, DbRelationship.LapTimeBelongsToSessionResult, NodeTypeLabel.SessionResult)

        const createdRelationship = await createRel(lapTimeId, sessionResultId, RelationshipType.LapTimeBelongsToSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getBelongsToSessionResultRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeBelongsToSessionResult, NodeTypeLabel.SessionResult)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.belongsToSessionResult, lapTimeId, null)
        }

        return relationship
    }

    static async deleteBelongsToSessionResultRelationship(lapTimeId: number, sessionResultId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const sessionResult = await SessionResult.findById(sessionResultId)
        if (!sessionResult) {
            throw new NodeNotFoundError(sessionResultId)
        }

        const relationship = await getSpecificRel(lapTimeId, sessionResultId, RelationshipType.LapTimeBelongsToSessionResult)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.belongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteSpecificRel(lapTimeId, sessionResultId, RelationshipType.LapTimeBelongsToSessionResult)
    }

    static async createAchievedOnTrackLayoutRelationship(lapTimeId: number, trackLayoutId: number) {

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const existingRelation = await getSpecificRel(lapTimeId, trackLayoutId, RelationshipType.LapTimeAchievedOnTrackLayout)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(LapTimeRelationship.achievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteDeprecatedRel(lapTimeId, DbRelationship.LapTimeAchievedOnTrackLayout, NodeTypeLabel.TrackLayout)

        const createdRelationship = await createRel(lapTimeId, trackLayoutId, RelationshipType.LapTimeAchievedOnTrackLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAchievedOnTrackLayoutRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeAchievedOnTrackLayout, NodeTypeLabel.TrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.achievedOnTrackLayout, lapTimeId, null)
        }

        return relationship
    }

    static async deleteAchievedOnTrackLayoutRelationship(lapTimeId: number, trackLayoutId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const trackLayout = await TrackLayout.findById(trackLayoutId)
        if (!trackLayout) {
            throw new NodeNotFoundError(trackLayoutId)
        }

        const relationship = await getSpecificRel(lapTimeId, trackLayoutId, RelationshipType.LapTimeAchievedOnTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.achievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteSpecificRel(lapTimeId, trackLayoutId, RelationshipType.LapTimeAchievedOnTrackLayout)
    }

    static async createAchievedWithCarModelVariantRelationship(lapTimeId: number, carModelVariantId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const existingRelation = await getSpecificRel(lapTimeId, carModelVariantId, RelationshipType.LapTimeAchievedWithCarModelVariant)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(LapTimeRelationship.achievedWithCarModelVariant, lapTimeId, carModelVariantId)
        }
        await deleteDeprecatedRel(lapTimeId, DbRelationship.LapTimeAchievedWithCarModelVariant, NodeTypeLabel.CarModelVariant)


        const createdRelationship = await createRel(lapTimeId, carModelVariantId, RelationshipType.LapTimeAchievedWithCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAchievedWithCarModelVariantRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeAchievedWithCarModelVariant, NodeTypeLabel.CarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.achievedWithCarModelVariant, lapTimeId, null)
        }

        return relationship
    }

    static async createHasImageRelationship(lapTimeId: number, imageId: number) {

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(LapTimeRelationship.hasImage, lapTimeId, imageId)
        }

        const createdRelationship = await createRel(lapTimeId, imageId, RelationshipType.LapTimeHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getAllHasImageRelationships(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        return getAllRels(lapTimeId, RelationshipType.LapTimeHasImage)
    }

    static async deleteHasImageRelationship(lapTimeId: number, imageId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.hasImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasImage)
    }

    static async createHasPrimeImageRelationship(lapTimeId: number, imageId: number) {

        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const existingRelation = await getSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(LapTimeRelationship.hasPrimeImage, lapTimeId, imageId)
        }

        await deleteDeprecatedRel(lapTimeId, DbRelationship.LapTimeHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(lapTimeId, imageId, RelationshipType.LapTimeHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    }

    static async getHasPrimeImageRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeHasPrimeImage, NodeTypeLabel.Image)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.hasPrimeImage, lapTimeId, null)
        }

        return relationship
    }

    static async deleteHasPrimeImageRelationship(lapTimeId: number, imageId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const image = await Image.findById(imageId)
        if (!image) {
            throw new NodeNotFoundError(imageId)
        }

        const relationship = await getSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(LapTimeRelationship.hasPrimeImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasPrimeImage)
    }
}
