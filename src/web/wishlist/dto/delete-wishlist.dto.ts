import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wishlist.dto';

export class DeleteWishlistDto extends PartialType(CreateWishlistDto) {}
