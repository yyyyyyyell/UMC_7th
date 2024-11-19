import { StatusCodes } from "http-status-codes";
import { bodyToReview, parseCursor  } from "../dtos/review.dto.js";
import { ReviewAdd, listUserReviews } from "../services/review.service.js";

export const handleReviewAdd = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 추가 API';
    #swagger.description = '특정 가게에 리뷰를 추가합니다.';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              score: { type: 'number', example: 4 },
              content: { type: 'string', example: 'Great place!' },
              login_id: { type: 'number', example: 1 },
              store_id: { type: 'number', example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '리뷰 추가 성공',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              success: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  content: { type: 'string' }
                }
              },
              error: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("가게에 리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await ReviewAdd(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
};

export const handleListUserReviews = async (req, res) => {
  /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.description = '특정 사용자가 작성한 리뷰 목록을 조회합니다.';
    #swagger.parameters['loginId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'number'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '리뷰 조회 시작점 (옵션)',
      required: false,
      type: 'number'
    };
    #swagger.responses[200] = {
      description: '리뷰 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              success: {
                type: 'object',
                properties: {
                  reviews: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        score: { type: 'number' },
                        content: { type: 'string' }
                      }
                    }
                  },
                  pagination: { type: 'object', properties: { cursor: { type: 'number', nullable: true } } }
                }
              },
              error: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("사용자 리뷰 목록 조회 요청!");

  const loginId = parseInt(req.params.loginId, 10);
  const cursor = parseCursor(req.query.cursor);
  const reviews = await listUserReviews(loginId, cursor);

  res.status(StatusCodes.OK).success(reviews);
};