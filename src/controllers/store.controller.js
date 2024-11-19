import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { StoreAdd, listStoreReviews } from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {
  /*
    #swagger.summary = '특정 지역에 가게 추가하기 API';
    #swagger.description = '특정 주소에 새로운 가게를 추가합니다.';
    #swagger.parameters['addressId'] = {
      in: 'path',
      description: '주소 ID',
      required: true,
      type: 'number'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'New Store' },
              info: { type: 'string', example: 'Store Description' },
              address_id: { type: 'number', example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '가게 추가 성공',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              success: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  info: { type: 'string' }
                }
              },
              error: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("특정 지역에 가게 추가를 요청했습니다!");
  console.log("body:", req.body);

  const store = await StoreAdd(bodyToStore(req.body));
  console.log("Final result sent to client:", store);
  res.status(StatusCodes.OK).success(store);
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  res.success(reviews);
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};