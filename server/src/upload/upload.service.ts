import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
  HeadObjectCommand,
  HeadObjectCommandInput,
  HeadObjectCommandOutput,
  DeleteObjectCommandOutput,
  ListObjectsCommand,
  GetObjectCommandOutput
} from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION
  })

  async uploadObject(filename: string, file: Buffer, folder: string) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `${folder}/${filename}`,
          Body: file,
        })
      )
      return {
        status: HttpStatus.OK,
        message: "Uploaded to S3 successfully"
      }
    } catch (err) {
      throw new HttpException('Something gone wrond with video upload :(', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteObject(filename: string, folder: string) {
    const path = `${folder}/${filename}`
    const isObjectExist = await this.existsInS3(path)
    if (!isObjectExist) {
      throw new HttpException('No such object', HttpStatus.NOT_FOUND)
    }
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: path,
      })
    )
    return {
      status: HttpStatus.OK,
      message: "Object successfully deleted!"
    }
  }

  async getObject(filename: string, folder: string): Promise<GetObjectCommandOutput> {
    const result = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${folder}/${filename}`
      })
    )
    if (!result) {
      throw new HttpException('Object not found :(', HttpStatus.NOT_FOUND);
    }

    return result
  }


  async existsInS3(key: string):Promise<boolean> {
    try {
      const bucketParams: HeadObjectCommandInput = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
      };
      const cmd = new HeadObjectCommand(bucketParams);
      const data: HeadObjectCommandOutput = await this.s3Client.send(cmd);

      const exists = data.$metadata.httpStatusCode === 200;
      return exists;
    } catch (error) {
      if (error.$metadata?.httpStatusCode === 404) {
        return false;
      } else if (error.$metadata?.httpStatusCode === 403) {
        return false;
      } else {
        throw new HttpException('Object not found :(', HttpStatus.NOT_FOUND);
      }
    }
  }

  async deleteAllObjectsFromSpecifivFolder(folder: string) {
    const DeletePromises: Promise<DeleteObjectCommandOutput>[] = [];
    const { Contents } = await this.s3Client.send(
      new ListObjectsCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Prefix: folder,
      }),
    );
    if (!Contents) {
      return {
        status: 200,
        message: "Nothing to delete"
      }
    };
    Contents.forEach(({ Key }) => {
      DeletePromises.push(
        this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key,
          }),
        ),
      );
    });
  
    await Promise.all(DeletePromises);

    return {
      status: 200,
      message: "All objects successfully deleted"
    }
  }

}
