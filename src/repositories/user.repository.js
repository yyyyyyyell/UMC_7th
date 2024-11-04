//데이터베이스와 상호작용

import { pool } from "../db.config.js";

// User 데이터 삽입(사용자 데이터를 받아 데이터베이스에 추가)
export const addUser = async (data) => {
  const conn = await pool.getConnection(); //연결 풀에서 데이터베이스 연결을 가져옵니다

  try {
    const [confirm] = await pool.query(
    //pool.query()는 배열 형태로 결과를 반환([결과 배열, 메타데이터]), 반환된 배열의 첫 번째 요소(결과)를 confirm 변수에 할당
    
      `SELECT EXISTS(SELECT 1 FROM signup WHERE account = ?) as isExistEmail;`,data.account
      /* SELECT EXISTS는 서브쿼리의 조건을 만족하는 레코드가 하나라도 있는지 확인하는 구문.

      EXISTS(서브쿼리)는 서브쿼리 결과가 존재하면 true(1), 없으면 false(0)를 반환
      SELECT 1은 조건을 만족하는 레코드가 하나라도 있으면 1을 반환

      as isExistEmail는 EXISTS 결과를 isExistEmail이라는 필드 이름으로 반환*/
    );

    if (confirm[0].isExistEmail) {
      return null;
      //isExistEmail이 1이면 중복 이메일이므로 사용자 추가를 중단하고 null을 반환
    }

    const [result] = await pool.query( //복이 아닌 경우 INSERT INTO 쿼리를 통해 데이터베이스에 새 사용자를 추가
      `INSERT INTO signup (account, password, name, gender, birth) VALUES (?, ?, ?, ?, ?);`,
      //바인딩된 매개변수: ?에 해당하는 값들이 배열로 전달되며, SQL 인젝션 공격을 방지하기 위해 사용됩니다.
      [
        data.account,
        data.password,
        data.name,
        data.gender,
        data.birth
      ]
    );
    return result.insertId; //데이터베이스에 성공적으로 추가된 사용자의 ID를 반환
    // INSERT INTO 쿼리를 실행하면, 삽입된 행의 고유 ID(기본 키 값)를 insertId라는 이름으로 반환

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release(); //연결을 반환 -> 풀의 연결 해제
  }
};

// 사용자 정보 얻기(사용자 ID를 받아 해당 사용자 정보를 조회)
export const getUser = async (insertId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM signup WHERE id = ?;`, insertId);

    console.log(user);

    if (user.length == 0) { //조회된 배열 user의 길이가 0이면 해당 ID의 사용자가 없다는 의미이므로 null을 반환
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
