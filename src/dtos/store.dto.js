export const bodyToStore = (body) => {

    return {
      name: body.name,
      info: body.info,
      address_id: body.address_id
    };
  };

export const responseFromStore = ({ store }) => {

    return {
        name: store.name,
        info: store.info,
    };
  };
  