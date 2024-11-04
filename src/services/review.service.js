import { responseFromReview } from "../dtos/review.dto.js";
import {addReview,getReview} from "../repositories/review.repository.js";

export const ReviewAdd = async (data) => {
  const joinReviewId = await addReview({
    score: data.score,
    content: data.content,
    login_id: data.login_id,
    store_id: data.store_id
  });

  if (joinReviewId === null) {
    throw new Error("가게가 존재하지 않습니다.");
  }
  
  const review = await getReview(joinReviewId);
  
  return responseFromReview({ review: review[0] });
};