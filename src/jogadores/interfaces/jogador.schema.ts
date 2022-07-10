import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    positionRank: Number,
    urlImage: String,
  },

  //Data de criação e update.
  { timestamps: true, collection: 'jogadores' },
);
