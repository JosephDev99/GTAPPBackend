import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class History extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  DateTime: String;

  @Column()
  price: Number;

  @Column()
  start: String;

  @Column()
  dest: String;

}
