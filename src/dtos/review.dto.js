export const bodyToReview = (body) => {

    return {
        score: body.score,
        content: body.content,
        login_id: body.login_id,
        store_id: body.store_id
    };
  };

export const responseFromReview = (review) => {

    return {
        score: review.score,
        content: review.content
    };
  };
  
export const parseCursor = (cursor) => {
  return cursor ? parseInt(cursor, 10) : null;
};

export const responseFromUserReviews  = (reviews) => ({
  reviews: reviews.map((review) => ({
    score: review.score,
    content: review.content,
  })),
  pagination: {
    cursor: reviews.length ? reviews[reviews.length - 1].id : null,
  },
});