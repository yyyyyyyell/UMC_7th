import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStoreAdd, handleListStoreReviews } from "./controllers/store.controller.js";
import { handleReviewAdd } from "./controllers/review.controller.js";
import { handleMissionAdd, handleListStoreMissions, handleListUserOngoingMissions, handleCompleteUserMission} from "./controllers/mission.controller.js";
import { handleOngoing } from "./controllers/ongoing.controller.js";
import { handleListUserReviews } from "./controllers/review.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

/* 공통 응답을 사용할 수 있는 헬퍼 함수 등록 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/", handleUserSignUp); // 정해진 URL로 POST 요청을 보내면 handleUserSignUp 함수가 실행

app.post("/address/:addressId/stores", handleStoreAdd); //1. 특정 지역에 가게 추가하기 API

app.post("/stores/:storeId/reviews", handleReviewAdd); //2. 가게에 리뷰 추가하기 API

app.post("/stores/:storeId/missions", handleMissionAdd); //3. 가게에 미션 추가하기 API

app.post("/users/:usersId/missions/:missionId", handleOngoing); //4. 가게의 미션을 도전 중인 미션에 추가(미션 도전하기) API

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews); //목록 조회 API(가게 리뷰)

app.get("/users/:loginId/reviews", handleListUserReviews);

app.get("/stores/:storeId/missions", handleListStoreMissions );

app.get("/users/:userId/ongoing-missions", handleListUserOngoingMissions );

app.patch("/users/:userId/missions/:missionId/complete", handleCompleteUserMission);

/* 전역 오류를 처리하기 위한 미들웨어 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});