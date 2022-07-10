import { Document } from 'mongoose';
export interface Jogador extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  nome: string;
  ranking: string;
  positionRank: number;
  urlImage: string;
}
