import { StatusCodes } from "http-status-codes";
import { bodyToMission, parseCursor } from "../dtos/mission.dto.js";
import { MissionAdd, listStoreMissions, listUserOngoingMissions } from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  console.log("가게에 미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  const mission = await MissionAdd(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleListStoreMissions = async (req, res) => {
  console.log("특정 가게의 미션 목록 조회 요청!");

  const storeId = parseInt(req.params.storeId, 10);
  const cursor = parseCursor(req.query.cursor);
  const missions = await listStoreMissions(storeId, cursor);

  res.status(StatusCodes.OK).json({ result: missions });
};

export const handleListUserOngoingMissions = async (req, res) => {
  console.log("진행 중인 미션 목록 조회 요청!");

  const userId = parseInt(req.params.userId, 10);
  const cursor = parseCursor(req.query.cursor);
  const missions = await listUserOngoingMissions(userId, cursor);

  res.status(StatusCodes.OK).json({ result: missions });
};

export const handleCompleteUserMission = async (req, res) => {
  console.log("미션 완료 요청!");

  const userId = parseInt(req.params.userId, 10);
  const missionId = parseInt(req.params.missionId, 10);
  await completeUserMission(userId, missionId);

  res.status(StatusCodes.OK).json({ message: "미션이 완료되었습니다." });
};