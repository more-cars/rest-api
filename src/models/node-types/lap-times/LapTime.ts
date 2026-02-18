import {CreateLapTimeInput} from "./types/CreateLapTimeInput"
import {LapTimeNode} from "./types/LapTimeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/nodes/lap-times/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../../db/nodes/lap-times/getNodeById"
import {getAllNodesOfType} from "../../../db/nodes/lap-times/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {SessionResult} from "../session-results/SessionResult"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelationshipAlreadyExistsError} from "../../types/RelationshipAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelationshipNotFoundError} from "../../types/RelationshipNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"
import {NodeTypeLabel} from "../../../db/NodeTypeLabel"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"

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

        const existingRelation = await getSpecificRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.LapTimeBelongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeBelongsToSessionResult, NodeTypeLabel.SessionResult)

        const createdRelationship = await createRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
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

        const relationship = await getRel(lapTimeId, RelType.LapTimeBelongsToSessionResult)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeBelongsToSessionResult, lapTimeId, null)
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

        const relationship = await getSpecificRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeBelongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteSpecificRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
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

        const existingRelation = await getSpecificRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.LapTimeAchievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeAchievedOnTrackLayout, NodeTypeLabel.TrackLayout)

        const createdRelationship = await createRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
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

        const relationship = await getRel(lapTimeId, RelType.LapTimeAchievedOnTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeAchievedOnTrackLayout, lapTimeId, null)
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

        const relationship = await getSpecificRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeAchievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteSpecificRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
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

        const existingRelation = await getSpecificRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.LapTimeAchievedWithCarModelVariant, lapTimeId, carModelVariantId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeAchievedWithCarModelVariant, NodeTypeLabel.CarModelVariant)

        const createdRelationship = await createRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
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

        const relationship = await getRel(lapTimeId, RelType.LapTimeAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeAchievedWithCarModelVariant, lapTimeId, null)
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

        const relationship = await getSpecificRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeAchievedWithCarModelVariant, lapTimeId, carModelVariantId)
        }

        await deleteSpecificRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
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

        const existingRelation = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.LapTimeHasImage, lapTimeId, imageId)
        }

        const createdRelationship = await createRel(lapTimeId, imageId, RelType.LapTimeHasImage)
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

        return getAllRels(lapTimeId, RelType.LapTimeHasImage)
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

        const relationship = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeHasImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelType.LapTimeHasImage)
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

        const existingRelation = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(RelType.LapTimeHasPrimeImage, lapTimeId, imageId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeHasPrimeImage, NodeTypeLabel.Image)

        const createdRelationship = await createRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
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

        const relationship = await getRel(lapTimeId, RelType.LapTimeHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeHasPrimeImage, lapTimeId, null)
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

        const relationship = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
        if (!relationship) {
            throw new RelationshipNotFoundError(RelType.LapTimeHasPrimeImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
    },
}
