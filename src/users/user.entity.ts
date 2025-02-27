
import { Exclude } from 'class-transformer';
import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Photo } from '../photos/photo.entity';


// in the entity we will ensure our fields are the same with our userDto
// we have id so we can use it in our table and it is created automatically by the database(pg)
// in our database it convert our entity in to a table

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar" ,{length:100, nullable:false})
  firstName: string;

  @Column("varchar" ,{length:100})
  lastName: string;

  @Column("varchar" ,{unique:true, nullable:false})
  email: string;

  @Exclude()
  @Column("varchar" ,{nullable:false})
  password: string;

  // doing a one to many releatinship btw users entity and post entity
  @OneToMany(() => Post, (posts) => posts.author)
  posts: Post[];

  // @Column({ default: true })
  // isActive: boolean; 

//   @OneToMany(type => Photo, photo => photo.user)
//   photos: Photo[];
}
