import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepository: Repository<Image>) {}

  create(cloudinaryId: string): void {
    this.imageRepository.insert({
      cloudinaryId,
      tags: []
    });
  }

  async findAll(): Promise<Image[]> {
    const images: Image[] = await this.imageRepository.find();
    return images;
  }

  async remove(cloudinaryId: string): Promise<void> {
    await this.imageRepository.delete({
      cloudinaryId
    });
  }

  async addOrEditTitle(cloudinaryId: string, title: string): Promise<void> {
    const newTitle: string | null = title ? title : null;

    await this.imageRepository.update(
      { cloudinaryId },
      { title: newTitle }
    );
  }

  async addTag(cloudinaryId: string, tag: string): Promise<void> {
    const image: Image = await this.imageRepository.findOneOrFail({
      where: {
        cloudinaryId
      }
    });

    await this.imageRepository.update(
      { cloudinaryId },
      {
        tags: [...image.tags, tag]
      }
    );
  }

  async removeTag(cloudinaryId: string, tag: string): Promise<void> {
    const image: Image = await this.imageRepository.findOneOrFail({
      where: {
        cloudinaryId
      }
    });

    await this.imageRepository.update(
      { cloudinaryId },
      {
        tags: image.tags.filter(t => t !== tag)
      }
    );
  }
}
