import { StatusCodes } from "http-status-codes";
import { bodyToMission, parseCursor } from "../dtos/mission.dto.js";
import { MissionAdd, listStoreMissions, listUserOngoingMissions,completeUserMission  } from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  /*
    #swagger.summary = '가게 미션 추가 API';
    #swagger.description = '특정 가게에 새로운 미션을 추가합니다.';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Clean the store' },
              content: { type: 'string', example: 'Help clean the store to earn points' },
              point: { type: 'number', example: 50 },
              code: { type: 'string', example: 'CLEAN50' },
              store_id: { type: 'number', example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '미션 추가 성공',
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
                  name: { type: 'string' }
                }
              },
              error: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("가게에 미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  const mission = await MissionAdd(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
};

export const handleListStoreMissions = async (req, res) => {
  /*
    #swagger.summary = '가게 미션 목록 조회 API';
    #swagger.description = '특정 가게에 등록된 미션 목록을 조회합니다.';
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '가게 ID',
      required: true,
      type: 'number'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '조회 시작점 (옵션)',
      required: false,
      type: 'number'
    };
    #swagger.responses[200] = {
      description: '가게 미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              success: {
                type: 'object',
                properties: {
                  missions: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        content: { type: 'string' },
                        point: { type: 'number' }
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
  console.log("특정 가게의 미션 목록 조회 요청!");

  const storeId = parseInt(req.params.storeId, 10);
  const cursor = parseCursor(req.query.cursor);
  const missions = await listStoreMissions(storeId, cursor);
  res.status(StatusCodes.OK).success(missions);
};

export const handleListUserOngoingMissions = async (req, res) => {
  /*
    #swagger.summary = '진행 중인 미션 목록 조회 API';
    #swagger.description = '특정 사용자가 진행 중인 미션의 목록을 조회합니다.';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'number'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '조회 시작점 (옵션)',
      required: false,
      type: 'number'
    };
    #swagger.responses[200] = {
      description: '진행 중인 미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              success: {
                type: 'object',
                properties: {
                  missions: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        status: { type: 'string', example: 'ongoing' },
                        content: { type: 'string' },
                        point: { type: 'number' }
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
  console.log("진행 중인 미션 목록 조회 요청!");

  const userId = parseInt(req.params.userId, 10);
  const cursor = parseCursor(req.query.cursor);
  const missions = await listUserOngoingMissions(userId, cursor);
  res.status(StatusCodes.OK).success(missions);
};

export const handleCompleteUserMission = async (req, res) => {
  /*
    #swagger.summary = '진행 중인 미션 완료 API';
    #swagger.description = '특정 사용자가 진행 중인 미션을 완료 처리합니다.';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'number'
    };
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '미션 ID',
      required: true,
      type: 'number'
    };
    #swagger.responses[200] = {
      description: '미션 완료 처리 성공',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              success: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: '미션이 완료되었습니다.' }
                }
              },
              error: { type: 'object', nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("미션 완료 요청!");

  const userId = parseInt(req.params.userId, 10);
  const missionId = parseInt(req.params.missionId, 10);
  await completeUserMission(userId, missionId);
  res.status(StatusCodes.OK).success({ message: "미션이 완료되었습니다." });
};
