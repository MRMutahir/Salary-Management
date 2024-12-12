import { S3Client, DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, HeadObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { envKeys } from "./config/keys.js";



const s3Client = new S3Client({
    region: envKeys.AWS_REGION,
    credentials: {
        accessKeyId: envKeys.AWS_ACCESSKEYID,
        secretAccessKey: envKeys.AWS_SECRETACCESSKEY
    }
})


export { s3Client }