import { Entity, PrimaryGeneratedColumn, Column, Repository } from 'typeorm';

@Entity()
export class User extends Repository<User>{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  confirmPassword: string;
}
