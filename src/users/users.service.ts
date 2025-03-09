import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, type UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.password, salt);

    user.apiKey = uuid();

    const userSaved = await this.userRepository.save(user);
    delete userSaved.password;
    return userSaved;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async updateSecretKey(userId: number, secret: string) {
    await this.userRepository.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id: userId },
      {
        twoFASecret: null,
        enable2FA: false,
      },
    );
  }

  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.apiKey = :apiKey', { apiKey })
      .getOne();

    return user;
  }
}
