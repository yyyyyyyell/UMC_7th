// //DTO는 입력 데이터를 정형화된 형태로 파싱, 검증하여 전달하는 역할
// export const bodyToUser = (body) => {
//     const birth = new Date(body.birth);
//     //요청 본문에서 가져온 생년월일 필드를 JavaScript의 Date 객체로 변환하여 날짜 데이터로 저장

//     return { //body 객체에서 특정 필드들을 추출하여 새로운 객체를 반환
//       account: body.account,
//       password: body.password,
//       name: body.name,
//       gender: body.gender,
//       birth
//     };
//   };

export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    account: body.account,
    password: body.password,
    name: body.name,
    gender: body.gender,
    birth
  };
};

export const bodyToLogin = (body) => {
  return {
    account: body.account,
    password: body.password
  };
};


export const responseFromUser = ({ user }) => {

    return {
      account: user.account,
      name: user.name,
      gender: user.gender,
      birth: user.birth
      // 불필요하거나 민감한 정보는 클라이언트에 전달되지 않도록, password 필드 제외.
    };
  };
  

