import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    positionRank: Number,
    urlImage: String,
  },

  //Data de criação e deleção
  { timestamps: true, collection: 'jogadores' },
);
