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
import {SessionResult} from "../session-results/SessionResult"
import {getSpecificRel} from "../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../types/RelationshipAlreadyExistsError"
import {RelationshipType} from "../relationships/types/RelationshipType"
import {getRel} from "../relationships/getRel"
import {RelationshipNotFoundError} from "../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../relationships/deleteSpecificRel"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {Image} from "../images/Image"
import {getAllRels} from "../relationships/getAllRels"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {deleteOutgoingRel} from "../relationships/deleteOutgoingRel"

export const LapTime = {
    async create(data: CreateLapTimeInput): Promise<LapTimeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | LapTimeNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<LapTimeNode[]> {
        const nodes: LapTimeNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes
    },

    async delete(lapTimeId: number): Promise<void> {
        const node = await LapTime.findById(lapTimeId)
        if (!node) {
            throw new NodeNotFoundError(lapTimeId)
        }

        await deleteNode(lapTimeId)
    },

    async createBelongsToSessionResultRelationship(lapTimeId: number, sessionResultId: number) {

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
            throw new RelationshipAlreadyExistsError(RelationshipType.LapTimeBelongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteOutgoingRel(lapTimeId, RelationshipType.LapTimeBelongsToSessionResult, NodeTypeLabel.SessionResult)

        const createdRelationship = await createRel(lapTimeId, sessionResultId, RelationshipType.LapTimeBelongsToSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToSessionResultRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeBelongsToSessionResult)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.LapTimeBelongsToSessionResult, lapTimeId, null)
        }

        return relationship
    },

    async deleteBelongsToSessionResultRelationship(lapTimeId: number, sessionResultId: number) {
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
            throw new RelationshipNotFoundError(RelationshipType.LapTimeBelongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteSpecificRel(lapTimeId, sessionResultId, RelationshipType.LapTimeBelongsToSessionResult)
    },

    async createAchievedOnTrackLayoutRelationship(lapTimeId: number, trackLayoutId: number) {

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
            throw new RelationshipAlreadyExistsError(RelationshipType.LapTimeAchievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteOutgoingRel(lapTimeId, RelationshipType.LapTimeAchievedOnTrackLayout, NodeTypeLabel.TrackLayout)

        const createdRelationship = await createRel(lapTimeId, trackLayoutId, RelationshipType.LapTimeAchievedOnTrackLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAchievedOnTrackLayoutRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeAchievedOnTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.LapTimeAchievedOnTrackLayout, lapTimeId, null)
        }

        return relationship
    },

    async deleteAchievedOnTrackLayoutRelationship(lapTimeId: number, trackLayoutId: number) {
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
            throw new RelationshipNotFoundError(RelationshipType.LapTimeAchievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteSpecificRel(lapTimeId, trackLayoutId, RelationshipType.LapTimeAchievedOnTrackLayout)
    },

    async createAchievedWithCarModelVariantRelationship(lapTimeId: number, carModelVariantId: number) {
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
            throw new RelationshipAlreadyExistsError(RelationshipType.LapTimeAchievedWithCarModelVariant, lapTimeId, carModelVariantId)
        }

        await deleteOutgoingRel(lapTimeId, RelationshipType.LapTimeAchievedWithCarModelVariant, NodeTypeLabel.CarModelVariant)

        const createdRelationship = await createRel(lapTimeId, carModelVariantId, RelationshipType.LapTimeAchievedWithCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAchievedWithCarModelVariantRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.LapTimeAchievedWithCarModelVariant, lapTimeId, null)
        }

        return relationship
    },

    async deleteAchievedWithCarModelVariantRelationship(lapTimeId: number, carModelVariantId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const carModelVariant = await CarModelVariant.findById(carModelVariantId)
        if (!carModelVariant) {
            throw new NodeNotFoundError(carModelVariantId)
        }

        const relationship = await getSpecificRel(lapTimeId, carModelVariantId, RelationshipType.LapTimeAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.LapTimeAchievedWithCarModelVariant, lapTimeId, carModelVariantId)
        }

        await deleteSpecificRel(lapTimeId, carModelVariantId, RelationshipType.LapTimeAchievedWithCarModelVariant)
    },

    async createHasImageRelationship(lapTimeId: number, imageId: number) {

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
            throw new RelationshipAlreadyExistsError(RelationshipType.LapTimeHasImage, lapTimeId, imageId)
        }

        const createdRelationship = await createRel(lapTimeId, imageId, RelationshipType.LapTimeHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        return getAllRels(lapTimeId, RelationshipType.LapTimeHasImage)
    },

    async deleteHasImageRelationship(lapTimeId: number, imageId: number) {
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
            throw new RelationshipNotFoundError(RelationshipType.LapTimeHasImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasImage)
    },

    async createHasPrimeImageRelationship(lapTimeId: number, imageId: number) {

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
            throw new RelationshipAlreadyExistsError(RelationshipType.LapTimeHasPrimeImage, lapTimeId, imageId)
        }

        await deleteOutgoingRel(lapTimeId, RelationshipType.LapTimeHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(lapTimeId, imageId, RelationshipType.LapTimeHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(lapTimeId: number) {
        const lapTime = await LapTime.findById(lapTimeId)
        if (!lapTime) {
            throw new NodeNotFoundError(lapTimeId)
        }

        const relationship = await getRel(lapTimeId, RelationshipType.LapTimeHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelationshipType.LapTimeHasPrimeImage, lapTimeId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(lapTimeId: number, imageId: number) {
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
            throw new RelationshipNotFoundError(RelationshipType.LapTimeHasPrimeImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelationshipType.LapTimeHasPrimeImage)
    },
}
