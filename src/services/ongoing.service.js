import { responseFromOngoing } from "../dtos/ongoing.dto.js";
import {addOngoing,getOngoing} from "../repositories/ongoing.repository.js";

export const Ongoing = async (data) => {
  const joinOngoingId = await addOngoing({
    login_id: data.login_id,
    mission_id: data.mission_id
  });

  if (joinOngoingId === null) {
    throw new DuplicateUserEmailError("이미 진행중인 미션입니다.", data);
  }
  
  const ongoing = await getOngoing(joinOngoingId);
  
  return responseFromOngoing(ongoing);
};