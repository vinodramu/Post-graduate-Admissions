// src/file-upload/gridFS.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

@Injectable()
export class GridFSService {
  private bucket: GridFSBucket;

  constructor() {
    const client = new MongoClient('mongodb://192.168.0.102:27017');
    this.bucket = new GridFSBucket(client.db('studentregistration'));
  }

  async uploadFile(
    filename: string,
    buffer: Buffer,
    contentType: string
  ): Promise<{ filename: string; id: ObjectId }> {
    const uploadStream = this.bucket.openUploadStream(filename, {
      contentType,
    });
    uploadStream.end(buffer);

    return new Promise((resolve, reject) => {
      uploadStream.on('finish', () => {
        resolve({ filename, id: uploadStream.id });
      });
      uploadStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  async deleteFile(fileId: string): Promise<void> {
    const id = new ObjectId(fileId);
    try {
      return this.bucket.delete(id);
    } catch (error) {
      throw new NotFoundException(`File with ID ${fileId} not found`);
    }
  }

  async getFile(filename: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.bucket
        .openDownloadStreamByName(filename)
        .on('data', (chunk) => {
          resolve(chunk);
        })
        .on('error', () => {
          reject(new NotFoundException(`File ${filename} not found`));
        });
    });
  }

  async getFileById(fileId: string): Promise<NodeJS.ReadableStream> {
    const id = new ObjectId(fileId);
    try {
      return this.bucket.openDownloadStream(id);
    } catch (error) {
      throw new NotFoundException(`File with ID ${fileId} not found`);
    }
  }

  async getFileStream(fileId: string): Promise<NodeJS.ReadableStream> {
    const id = new ObjectId(fileId);
    return this.bucket.openDownloadStream(id);
  }
}
