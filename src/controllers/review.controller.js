import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { ReviewAdd } from "../services/review.service.js";

export const handleReviewAdd = async (req, res, next) => {
  console.log("가게에 리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await ReviewAdd(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};