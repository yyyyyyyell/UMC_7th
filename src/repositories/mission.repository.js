import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection(); 
  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE code = ?) as isExistMission;`,
      data.code
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO mission (name, content, point, code, store_id) VALUES (?, ?, ?, ?, ?);`,
      [
        data.name,
        data.content,
        data.point,
        data.code,
        data.store_id
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


export const getMission= async (insertId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, insertId);

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