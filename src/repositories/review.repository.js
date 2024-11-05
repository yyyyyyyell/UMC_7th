import prisma from "../db.config.js";

// 가게가 존재하는지 확인 후 리뷰 추가
export const addReview = async (data) => {
  try {
    // 가게가 존재하는지 확인
    const store = await prisma.store.findUnique({
      where: {
        id: data.store_id,
      },
    });

    if (!store) {
      return null;
    }

    // 리뷰 추가
    const newReview = await prisma.review.create({
      data: {
        score: data.score,
        content: data.content,
        loginId: data.login_id,
        storeId: data.store_id,
      },
    });

    return newReview.id;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};

export const getReview = async (reviewId) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};

export const getUserReviews = async (loginId) => {
  
  const reviews = await prisma.review.findMany({
    where: { loginId },
    orderBy: { id: "asc" },
    take: 10,
  });
  
  return reviews;
};