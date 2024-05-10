import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { In, Repository } from 'typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  async createWishlist(createWishlistDto: CreateWishlistDto, user: User) {
    const { name, image, itemsId } = createWishlistDto;

    if (!itemsId || itemsId.length === 0) {
      throw new BadRequestException(
        'Для создания вишлиста необходимо указать хотя бы одно желание.',
      );
    }
    const wishes = await this.wishRepository.findBy({ id: In(itemsId) });

    const wishlist = this.wishlistRepository.create({
      name,
      image,
      owner: user,
      items: wishes,
    });

    return this.wishlistRepository.save(wishlist);
  }

  async findAll() {
    return await this.wishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  async findOne(id: number) {
    const newWishlist = await this.wishlistRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: true,
        items: true,
      },
    });
    if (!newWishlist) {
      throw new NotFoundException();
    }
    return newWishlist;
  }

  async updateWishlist(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    user: User,
  ) {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new NotFoundException('Такой вишлист не найден');
    }
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Нельзя редактировать чужой вишлист');
    }
    Object.assign(wishlist, updateWishlistDto);
    await this.wishRepository.save(wishlist);

    return this.wishlistRepository.save(wishlist);
  }

  async removeWishlist(id: number) {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new NotFoundException('Такой вишлист не найден');
    }
    await this.wishlistRepository.remove(wishlist);
    return wishlist;
  }
}
