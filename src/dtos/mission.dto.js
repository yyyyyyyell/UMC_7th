export const bodyToMission = (body) => {

    return {
        name: body.name,
        content: body.content,
        point: body.point,
        code: body.code,
        store_id: body.store_id
    };
  };

export const responseFromMission = ({ mission }) => {

    return {
        name: mission.name,
        content: mission.content,
        point: mission.point,
        code: mission.code,
        }
  };