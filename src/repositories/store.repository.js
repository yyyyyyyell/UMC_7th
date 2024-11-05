import prisma from "../db.config.js";

// 같은 주소에 같은 가게가 있는지 확인 후 가게 추가
export const addStore = async (data) => {
  try {
    // 같은 주소와 이름을 가진 가게가 있는지 확인
    const existingStore = await prisma.store.findFirst({
      where: {
        name: data.name,
        addressId: data.address_id,
      },
    });

    if (existingStore) {
      return null;
    }

    // 가게 추가
    const newStore = await prisma.store.create({
      data: {
        name: data.name,
        info: data.info,
        addressId: data.address_id,
      },
    });

    return newStore.id; // Prisma는 생성된 객체를 반환하므로, id 필드를 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};


export const getStore = async (storeId) => {
  try {
    // Prisma를 사용하여 ID로 매장 조회
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};