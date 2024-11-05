export const bodyToStore = (body) => {

    return {
      name: body.name,
      info: body.info,
      address_id: body.address_id
    };
  };

export const responseFromStore = (store) => {

    return {
        name: store.name,
        info: store.info
    };
  };
  
  export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };