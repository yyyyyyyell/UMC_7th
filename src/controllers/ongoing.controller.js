import { StatusCodes } from "http-status-codes";
import { bodyToOngoing } from "../dtos/ongoing.dto.js";
import { Ongoing } from "../services/ongoing.service.js";

export const handleOngoing = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전 추가 API';
    #swagger.description = '특정 사용자가 특정 미션에 도전하도록 추가합니다.';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              user_id: { type: 'number', example: 1 },
              mission_id: { type: 'number', example: 2 }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '미션 도전 추가 성공',
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
                  status: { type: 'string', example: 'ongoing' }
                }
              },
              error: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("가게 미션을 도전 중인 미션에 추가했습니다!");
  console.log("body:", req.body);

  const ongoing = await Ongoing(bodyToOngoing(req.body));
  res.status(StatusCodes.OK).success(ongoing);
};