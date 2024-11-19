//데이터베이스와 상호작용
import { pool } from "../db.config.js";

import prisma from '../db.config.js';

// // User 데이터 삽입
// export const addUser = async (data) => {
//   const user = await prisma.user.findFirst({ where: { account: data.account } });
//   if (user) {
//     return null;
//   }

//   const created = await prisma.user.create({ data: data });
//   return created.id;
// };

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: {
      account: userData.account,
      password: userData.password,
      name: userData.name,
      gender: userData.gender,
      birth: userData.birth
    }
  });
};

export const findUserByEmail = async (account) => {
  return await prisma.user.findFirst({
    where: { account }
  });
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

export const getAllStoreReviews = async (storeId) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      score: true,
      content: true,
      loginId: true,
      storeId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};