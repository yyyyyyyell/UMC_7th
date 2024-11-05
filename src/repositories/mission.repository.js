import prisma from "../db.config.js";

export const addMission = async (data) => {
  try {
    // 중복된 코드가 있는지 확인
    const existingMission = await prisma.mission.findUnique({
      where: {
        code: data.code,
      },
    });

    if (existingMission) {
      return null;
    }

    // 미션 추가
    const newMission = await prisma.mission.create({
      data: {
        name: data.name,
        content: data.content,
        point: data.point,
        code: data.code,
        storeId: data.store_id,
      },
    });

    return newMission.id; // Prisma는 생성된 객체를 반환하므로, id 필드 반환
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getMission = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: {
        id: missionId,
      },
    });

    if (!mission) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getStoreMissions = async (storeId, cursor) => {
  return await prisma.mission.findMany({
    where: { storeId },
    orderBy: { id: "asc" },
    take: 10,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });
};

export const getUserOngoingMissions = async (userId, cursor) => {
  return await prisma.loginMissionStatus.findMany({
    where: { loginId: userId, status: "ongoing" },
    orderBy: { id: "asc" },
    take: 10,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });
};

export const completeMission = async (userId, missionId) => {
  await prisma.loginMissionStatus.updateMany({
    where: {
      loginId: userId,
      missionId: missionId,
      status: "ongoing"
    },
    data: { status: "completed" }
  });
};