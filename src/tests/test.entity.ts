import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('testes')
export class Teste {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  name: string;
}
