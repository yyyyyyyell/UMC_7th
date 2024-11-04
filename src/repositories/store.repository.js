import { pool } from "../db.config.js";

// 같은 주소에 같은 가게가 있는지 확인
export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
    
      `SELECT EXISTS(SELECT 1 FROM store WHERE name = ? AND address_id = ?) as isExistStore;`,
      [data.name,data.address_id]
    );

    if (confirm[0].isExistStore) {
      return null;
    }
    
    //가게 추가
    const [result] = await pool.query( 
      `INSERT INTO store (name, info, address_id) VALUES (?, ?, ?);`,
      [
        data.name,
        data.info,
        data.address_id
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

export const getStore = async (insertId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, insertId);

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
