import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { StoreAdd, listStoreReviews } from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {
  console.log("특정 지역에 가게 추가를 요청했습니다!");
  console.log("body:", req.body);

  const store = await StoreAdd(bodyToStore(req.body));
  console.log("Final result sent to client:", store);
  res.status(StatusCodes.OK).success(store);
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};