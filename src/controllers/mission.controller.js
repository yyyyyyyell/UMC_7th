import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { MissionAdd } from "../services/mission.service.js";

export const handleMissionAdd = async (req, res, next) => {
  console.log("가게에 미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  const mission = await MissionAdd(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};