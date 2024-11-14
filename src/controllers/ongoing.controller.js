import { StatusCodes } from "http-status-codes";
import { bodyToOngoing } from "../dtos/ongoing.dto.js";
import { Ongoing } from "../services/ongoing.service.js";

export const handleOngoing = async (req, res, next) => {
  console.log("가게 미션을 도전 중인 미션에 추가했습니다!");
  console.log("body:", req.body);

  const ongoing = await Ongoing(bodyToOngoing(req.body));
  res.status(StatusCodes.OK).success(ongoing);
};