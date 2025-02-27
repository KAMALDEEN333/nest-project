import { IsJSON, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreatePostMetaOptionsDto {



@CreateDateColumn()
createDate: Date;

@UpdateDateColumn()
    updatedatecolumn:Date;


  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}