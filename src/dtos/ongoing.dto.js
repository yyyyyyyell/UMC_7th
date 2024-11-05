export const bodyToOngoing = (body) => {

    return {
        login_id: body.login_id,
        mission_id: body.mission_id
    };
  };

export const responseFromOngoing = (ongoing) => {

    return {
        mission_id: ongoing.mission_id,
        status:'ongoing'
        }
  };