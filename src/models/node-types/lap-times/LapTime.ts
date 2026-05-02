import {CreateLapTimeInput} from "./types/CreateLapTimeInput"
import {LapTimeNode} from "./types/LapTimeNode"
import {convertInputData} from "./create/convertInputData"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/lap-times/getNodeById"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {createRel} from "../../relationships/createRel"
import {SessionResult} from "../session-results/SessionResult"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getRel} from "../../relationships/getRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {TrackLayout} from "../track-layouts/TrackLayout"
import {Image} from "../images/Image"
import {getAllRels} from "../../relationships/getAllRels"
import {CarModelVariant} from "../car-model-variants/CarModelVariant"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {Video} from "../videos/Video"
import {fetchNodesFromDb} from "../../../db/nodes/fetchNodesFromDb"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {getDbQueryCollectionParams} from "../../../db/nodes/getDbQueryCollectionParams"
import {createNeo4jNode} from "../../../db/nodes/createNeo4jNode"
import {MagazineIssue} from "../magazine-issues/MagazineIssue"

export const LapTime = {
    async create(data: CreateLapTimeInput): Promise<LapTimeNode> {
        const input = convertInputData(data)
        const result = await createNeo4jNode(DbNodeType.LapTime, input)

        return convertDbNodeToModelNode(result) as LapTimeNode
    },

    async findById(id: number): Promise<LapTimeNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as LapTimeNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<LapTimeNode[]> {
        const nodes: LapTimeNode[] = []
        const nodesDb = await fetchNodesFromDb(DbNodeType.LapTime, getDbQueryCollectionParams(options))

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as LapTimeNode)
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

    async createBelongsToSessionResultRelationship(lapTimeId: number, sessionResultId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await SessionResult.findById(sessionResultId)

        const existingRelation = await getSpecificRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeBelongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeBelongsToSessionResult)

        const createdRelationship = await createRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getBelongsToSessionResultRelationship(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        const relationship = await getRel(lapTimeId, RelType.LapTimeBelongsToSessionResult)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeBelongsToSessionResult, lapTimeId, null)
        }

        return relationship
    },

    async deleteBelongsToSessionResultRelationship(lapTimeId: number, sessionResultId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await SessionResult.findById(sessionResultId)

        const relationship = await getSpecificRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeBelongsToSessionResult, lapTimeId, sessionResultId)
        }

        await deleteSpecificRel(lapTimeId, sessionResultId, RelType.LapTimeBelongsToSessionResult)
    },

    async createAchievedOnTrackLayoutRelationship(lapTimeId: number, trackLayoutId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await TrackLayout.findById(trackLayoutId)

        const existingRelation = await getSpecificRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeAchievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeAchievedOnTrackLayout)

        const createdRelationship = await createRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAchievedOnTrackLayoutRelationship(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        const relationship = await getRel(lapTimeId, RelType.LapTimeAchievedOnTrackLayout)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeAchievedOnTrackLayout, lapTimeId, null)
        }

        return relationship
    },

    async deleteAchievedOnTrackLayoutRelationship(lapTimeId: number, trackLayoutId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await TrackLayout.findById(trackLayoutId)

        const relationship = await getSpecificRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeAchievedOnTrackLayout, lapTimeId, trackLayoutId)
        }

        await deleteSpecificRel(lapTimeId, trackLayoutId, RelType.LapTimeAchievedOnTrackLayout)
    },

    async createAchievedWithCarModelVariantRelationship(lapTimeId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await CarModelVariant.findById(carModelVariantId)

        const existingRelation = await getSpecificRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeAchievedWithCarModelVariant, lapTimeId, carModelVariantId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeAchievedWithCarModelVariant)

        const createdRelationship = await createRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAchievedWithCarModelVariantRelationship(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        const relationship = await getRel(lapTimeId, RelType.LapTimeAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeAchievedWithCarModelVariant, lapTimeId, null)
        }

        return relationship
    },

    async deleteAchievedWithCarModelVariantRelationship(lapTimeId: number, carModelVariantId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await CarModelVariant.findById(carModelVariantId)

        const relationship = await getSpecificRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeAchievedWithCarModelVariant, lapTimeId, carModelVariantId)
        }

        await deleteSpecificRel(lapTimeId, carModelVariantId, RelType.LapTimeAchievedWithCarModelVariant)
    },

    async createDocumentedInMagazineIssueRelationship(lapTimeId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await MagazineIssue.findById(magazineIssueId)

        const existingRelation = await getSpecificRel(lapTimeId, magazineIssueId, RelType.LapTimeDocumentedInMagazineIssue)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeDocumentedInMagazineIssue, lapTimeId, magazineIssueId)
        }
        await deleteOutgoingRel(lapTimeId, RelType.LapTimeDocumentedInMagazineIssue)

        const createdRelationship = await createRel(lapTimeId, magazineIssueId, RelType.LapTimeDocumentedInMagazineIssue)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getDocumentedInMagazineIssueRelationship(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        const relationship = await getRel(lapTimeId, RelType.LapTimeDocumentedInMagazineIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeDocumentedInMagazineIssue, lapTimeId, null)
        }

        return relationship
    },

    async deleteDocumentedInMagazineIssueRelationship(lapTimeId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getSpecificRel(lapTimeId, magazineIssueId, RelType.LapTimeDocumentedInMagazineIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeDocumentedInMagazineIssue, lapTimeId, magazineIssueId)
        }

        await deleteSpecificRel(lapTimeId, magazineIssueId, RelType.LapTimeDocumentedInMagazineIssue)
    },

    async createHasImageRelationship(lapTimeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeHasImage, lapTimeId, imageId)
        }

        const createdRelationship = await createRel(lapTimeId, imageId, RelType.LapTimeHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        return getAllRels(lapTimeId, RelType.LapTimeHasImage)
    },

    async deleteHasImageRelationship(lapTimeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeHasImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelType.LapTimeHasImage)
    },

    async createHasPrimeImageRelationship(lapTimeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeHasPrimeImage, lapTimeId, imageId)
        }

        await deleteOutgoingRel(lapTimeId, RelType.LapTimeHasPrimeImage)

        const createdRelationship = await createRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        const relationship = await getRel(lapTimeId, RelType.LapTimeHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeHasPrimeImage, lapTimeId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(lapTimeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeHasPrimeImage, lapTimeId, imageId)
        }

        await deleteSpecificRel(lapTimeId, imageId, RelType.LapTimeHasPrimeImage)
    },

    async createHasVideoRelationship(lapTimeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(lapTimeId, videoId, RelType.LapTimeHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeHasVideo, lapTimeId, videoId)
        }

        const createdRelationship = await createRel(lapTimeId, videoId, RelType.LapTimeHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        return getAllRels(lapTimeId, RelType.LapTimeHasVideo)
    },

    async deleteHasVideoRelationship(lapTimeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(lapTimeId, videoId, RelType.LapTimeHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeHasVideo, lapTimeId, videoId)
        }

        await deleteSpecificRel(lapTimeId, videoId, RelType.LapTimeHasVideo)
    },

    async createHasMainVideoRelationship(lapTimeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(lapTimeId, videoId, RelType.LapTimeHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.LapTimeHasMainVideo, lapTimeId, videoId)
        }
        await deleteOutgoingRel(lapTimeId, RelType.LapTimeHasMainVideo)

        const createdRelationship = await createRel(lapTimeId, videoId, RelType.LapTimeHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(lapTimeId: number) {
        // checking that the node exists -> exception is thrown if not
        await LapTime.findById(lapTimeId)

        const relationship = await getRel(lapTimeId, RelType.LapTimeHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeHasMainVideo, lapTimeId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(lapTimeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await LapTime.findById(lapTimeId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(lapTimeId, videoId, RelType.LapTimeHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.LapTimeHasMainVideo, lapTimeId, videoId)
        }

        await deleteSpecificRel(lapTimeId, videoId, RelType.LapTimeHasMainVideo)
    },
}
