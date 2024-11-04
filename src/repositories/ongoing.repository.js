import { pool } from "../db.config.js";

export const addOngoing = async (data) => {
  const conn = await pool.getConnection(); 
  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM login_mission_status  WHERE login_id = ? AND mission_id = ? AND status = 'ongoing') as isAlreadyOngoing;`,
      [data.login_id, data.mission_id]
    );

    if (confirm[0].isAlreadyOngoing) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO login_mission_status (login_id, mission_id) VALUES (?, ?);`,
      [
        data.login_id,
        data.mission_id,
        'ongoing'
      ]
    );
    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release(); 
  }
};


export const getOngoing= async (insertId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM login_mission_status WHERE id = ?;`, insertId);

    console.log(user);

    if (user.length == 0) {
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