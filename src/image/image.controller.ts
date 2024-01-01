import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body('cloudinaryId') cloudinaryId: string): void {
    this.imageService.create(cloudinaryId);
  }

  @Get()
  async findAll(): Promise<Image[]> {
    const images: Image[] = await this.imageService.findAll();
    return images;
  }

  @Delete(':cloudinaryId')
  async remove(@Param('cloudinaryId') cloudinaryId: string): Promise<void> {
    await this.imageService.remove(cloudinaryId);
  }

  @Patch(':cloudinaryId/title')
  async addOrEditTitle(@Param('cloudinaryId') cloudinaryId: string, @Body('title') title: string): Promise<void> {
    await this.imageService.addOrEditTitle(cloudinaryId, title);
  }

  @Patch(':cloudinaryId/add-tag')
  async addTag(@Param('cloudinaryId') cloudinaryId: string, @Body('tag') tag: string): Promise<void> {
    await this.imageService.addTag(cloudinaryId, tag);
  }

  @Patch(':cloudinaryId/remove-tag')
  async removeTag(@Param('cloudinaryId') cloudinaryId: string, @Body('tag') tag: string): Promise<void> {
    await this.imageService.removeTag(cloudinaryId, tag);
  }
}
