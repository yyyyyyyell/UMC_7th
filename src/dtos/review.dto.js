export const bodyToReview = (body) => {

    return {
        score: body.score,
        content: body.content,
        login_id: body.login_id,
        store_id: body.store_id
    };
  };

export const responseFromReview = ({ review }) => {

    return {
        score: review.score,
        content: review.content
    };
  };
  