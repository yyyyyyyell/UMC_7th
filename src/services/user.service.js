//보내준 데이터를 이용해서 실제 로직을 구현

/*userSignUp 함수에서는 
여러 Repository 함수들을 호출하며 DB로부터 값을 조회하거나 생성하며 작업을 수행하고, 
마지막으로는 responseFromUser DTO를 다시 사용해 데이터를 변환한 후 반환*/

import { responseFromUser } from "../dtos/user.dto.js";
import {getUser} from "../repositories/user.repository.js";
//addUser, -> 7주차 워크북으로 바로 위 import에서 제외함.

// export const userSignUp = async (data) => {
//   const joinUserId = await addUser({//addUser: 새 사용자를 데이터베이스에 추가하고, 추가된 사용자의 고유 ID를 반환
//     //data 객체에서 필드를 추출하여 addUser 함수에 전달
//     account: data.account,
//     password: data.password,
//     name: data.name,
//     gender: data.gender,
//     birth: data.birth
//   });

//   if (joinUserId === null) { //==(값만 비교)를 사용하면 undefined도 조건을 만족할 수 있기 때문에 === 사용(타입과 값이 모두 같은 경우)
//     throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
//     //중복 이메일로 인해 새로운 사용자가 추가되지 않으면 addUser 함수가 null을 반환하도록 설계되어 있다
//   }
  
//   const user = await getUser(joinUserId); //새로 추가된 사용자의 ID(joinUserId)를 사용해 해당 사용자 정보를 조회
  
//   return responseFromUser({ user}); //user 객체를 responseFromUser 함수에 전달하여, 클라이언트에 보낼 응답 형식으로 가공
// };

import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/user.repository.js';

export const signUpUser = async (data) => {
  // 이메일 중복 확인
  const existingUser = await findUserByEmail(data.account);
  if (existingUser) {
    const error = new Error('이미 사용 중인 이메일입니다.');
    error.errorCode = 'account_EXISTS';
    throw error;
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 사용자 생성
  return await createUser({ ...data, password: hashedPassword });
};


export const loginUser = async (data) => {
  // 이메일로 사용자 조회
  const user = await findUserByEmail(data.account);

  // 사용자 존재 여부 확인
  if (!user) {
    const error = new Error('사용자를 찾을 수 없습니다.');
    error.errorCode = 'USER_NOT_FOUND';
    throw error;
  }

  // 비밀번호 검증
  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    const error = new Error('비밀번호가 올바르지 않습니다.');
    error.errorCode = 'INVALID_PASSWORD';
    throw error;
  }

  // 로그인 성공 시 사용자 ID 반환
  return { userId: user.id };
};