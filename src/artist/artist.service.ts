import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../common/constants';
import { PrismaService } from '../common/prisma-service/prisma.service';
import { isPrismaNotFoundError } from '../common/utils';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createDto: CreateArtistDto): Promise<ArtistResponseDto> {
    return await this.prisma.artist.create({ data: createDto });
  }

  public async findAll(): Promise<ArtistResponseDto[]> {
    return await this.prisma.artist.findMany();
  }

  public async findOne(id: string): Promise<ArtistResponseDto> {
    return await this.findById(id);
  }

  public async update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistResponseDto> {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`artist`);
      }
      throw err;
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`artist`);
      }
      throw err;
    }
  }

  private async findById(id: string): Promise<ArtistResponseDto> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(ErrorMessage.NotFound`artist`);
    }
    return artist;
  }
}
