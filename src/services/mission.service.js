import { responseFromMission, responseFromMissions } from "../dtos/mission.dto.js";
import {addMission,getMission,getStoreMissions, getUserOngoingMissions, completeMission   } from "../repositories/mission.repository.js";

export const MissionAdd = async (data) => {
  const joinMissionId = await addMission({
    name: data.name,
    content: data.content,
    point: data.point,
    code: data.code,
    store_id: data.store_id
  });

  if (joinMissionId === null) {
    throw new Error("이미 존재하는 미션입니다.");
  }
  
  const mission = await getMission(joinMissionId);
  
  return responseFromMission(mission);
};

export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};

export const listUserOngoingMissions = async (userId, cursor) => {
  const missions = await getUserOngoingMissions(userId, cursor);
  return responseFromMissions(missions);
};

export const completeUserMission = async (userId, missionId) => {
  await completeMission(userId, missionId);
};