import { pool } from "../db.config.js";

// 가게가 존재하는지 확인
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT * FROM store WHERE id = ?;`, 
      data.store_id
    );

    if (confirm.length == 0) {
      return null;
    }
    
    //리뷰 추가
    const [result] = await pool.query( 
      `INSERT INTO review (score, content, login_id, store_id) VALUES (?, ?, ?, ?);`,
      [
        data.score,
        data.content,
        data.login_id,
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

export const getReview = async (insertId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, insertId);

    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
