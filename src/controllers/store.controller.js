import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { StoreAdd } from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {
  console.log("특정 지역에 가게 추가를 요청했습니다!");
  console.log("body:", req.body);

  const store = await StoreAdd(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};