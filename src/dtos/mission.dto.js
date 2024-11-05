export const bodyToMission = (body) => {

    return {
        name: body.name,
        content: body.content,
        point: body.point,
        code: body.code,
        store_id: body.store_id
    };
  };

export const responseFromMission = (mission) => {

    return {
        name: mission.name,
        content: mission.content,
        point: mission.point,
        code: mission.code,
        }
  };

  export const parseCursor = (cursor) => {
    return cursor ? parseInt(cursor, 10) : null;
  };
  
  export const responseFromMissions = (missions) => ({
    missions: missions.map((mission) => ({
      name: mission.name,
      content: mission.content,
      point: mission.point,
      code: mission.code,
    })),
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  });
  