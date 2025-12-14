import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../common/constants';
import { PrismaService } from '../common/prisma-service/prisma.service';
import { isPrismaNotFoundError } from '../common/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackResponseDto } from './dto/track-response.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createDto: CreateTrackDto): Promise<TrackResponseDto> {
    return await this.prisma.track.create({ data: createDto });
  }

  public async findAll(): Promise<TrackResponseDto[]> {
    return await this.prisma.track.findMany();
  }

  public async findOne(id: string): Promise<TrackResponseDto> {
    return await this.findById(id);
  }

  public async update(id: string, updateDto: UpdateTrackDto): Promise<TrackResponseDto> {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateDto,
      });
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`track`);
      }
      throw err;
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`track`);
      }
      throw err;
    }
  }

  private async findById(id: string): Promise<TrackResponseDto> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException(ErrorMessage.NotFound`track`);
    }
    return track;
  }
}
