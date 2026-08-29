import {
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",

  endpoint:
    process.env.R2_ENDPOINT,

  credentials: {
    accessKeyId:
      process.env.R2_ACCESS_KEY_ID!,

    secretAccessKey:
      process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function createR2SignedUrl(
  key: string,
  expiresInSeconds = 60 * 60 * 24
) {
  const command =
    new GetObjectCommand({
      Bucket:
        process.env.R2_BUCKET_NAME,
      Key: key,

      ResponseContentDisposition:
        "attachment",
    });

  return getSignedUrl(
    r2,
    command,
    {
      expiresIn: expiresInSeconds,
    }
  );
}