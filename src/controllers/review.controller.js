import { StatusCodes } from "http-status-codes";
import { bodyToReview, parseCursor  } from "../dtos/review.dto.js";
import { ReviewAdd, listUserReviews } from "../services/review.service.js";

export const handleReviewAdd = async (req, res, next) => {
  console.log("가게에 리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await ReviewAdd(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
};

export const handleListUserReviews = async (req, res) => {
  console.log("사용자 리뷰 목록 조회 요청!");

  const loginId = parseInt(req.params.loginId, 10); // URL 파라미터에서 loginId 추출 및 변환
  const cursor = parseCursor(req.query.cursor); // parseCursor를 통해 cursor 변환
  const reviews = await listUserReviews(loginId, cursor);

  res.status(StatusCodes.OK).success(reviews);
};