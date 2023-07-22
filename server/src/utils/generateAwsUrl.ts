export const generateAwsUrl = (folder, filename) => {
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${folder}/${filename}`
}