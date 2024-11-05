import prisma from "../db.config.js";

export const addOngoing = async (data) => {
  try {
    // 진행 중인 미션이 있는지 확인
    const existingOngoing = await prisma.loginMissionStatus.findFirst({
      where: {
        loginId: data.login_id,
        missionId: data.mission_id,
        status: "ongoing",
      },
    });

    if (existingOngoing) {
      return null;
    }

    // 진행 중 상태 추가
    const newOngoing = await prisma.loginMissionStatus.create({
      data: {
        loginId: data.login_id,
        missionId: data.mission_id,
        status: "ongoing",
      },
    });

    return newOngoing.id;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};

export const getOngoing = async (ongoingId) => {
  try {
    const ongoing = await prisma.loginMissionStatus.findUnique({
      where: {
        id: ongoingId,
      },
    });

    if (!ongoing) {
      return null;
    }

    return ongoing;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};
