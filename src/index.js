import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { handleUserSignUp, handleLogin } from "./controllers/user.controller.js";
import { handleStoreAdd, handleListStoreReviews } from "./controllers/store.controller.js";
import { handleReviewAdd } from "./controllers/review.controller.js";
import { handleMissionAdd, handleListStoreMissions, 
  handleListUserOngoingMissions, handleCompleteUserMission
} from "./controllers/mission.controller.js";
import { handleOngoing } from "./controllers/ongoing.controller.js";
import { handleListUserReviews } from "./controllers/review.controller.js";

// 7주차 노드 워크북
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import session from 'express-session';
// 설명을 위해 코드를 아키텍처에 알맞게 나누지 않았기 때문에 prisma를 index.js에 불러와주세요
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


// 미들웨어로 쿠키 파서 등록해주기
app.use(cookieParser())
app.use(session({
  // 쿠키에 서명 추가하기  환경변수로 관리한다.
  secret: process.env.SESSION_SECRET,
  // 요청이 왔을 때 세션에 수정 사항이 없어도 다시 저장할지 설정하는 옵션
  resave: false,
  //  세션에 저장할 내용이 없어도 처음부터 세션을 설정할지 결정하는 옵션
  saveUninitialized: true,
  // 쿠키에 대한 설정을 하는 옵션
  cookie: { secure: process.env.NODE_ENV === 'production',// 프로덕션 환경에서만 secure 설정
          maxAge: 1000 * 60 * 60 * 24 // 쿠키 만료 시간 (예: 1일) 

  }
}));

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 7주차 노드 워크북: users -> signup 으로 변경.
app.post("/signup", handleUserSignUp); // 정해진 URL로 POST 요청을 보내면 handleUserSignUp 함수가 실행
app.post('/login', handleLogin);

app.post("/address/:addressId/stores", handleStoreAdd); //1. 특정 지역에 가게 추가하기 API
app.post("/stores/:storeId/reviews", handleReviewAdd); //2. 가게에 리뷰 추가하기 API
app.post("/stores/:storeId/missions", handleMissionAdd); //3. 가게에 미션 추가하기 API
app.post("/users/:usersId/missions/:missionId", handleOngoing); //4. 가게의 미션을 도전 중인 미션에 추가(미션 도전하기) API

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews); //목록 조회 API(가게 리뷰)
app.get("/users/:loginId/reviews", handleListUserReviews);
app.get("/stores/:storeId/missions", handleListStoreMissions );
app.get("/users/:userId/ongoing-missions", handleListUserOngoingMissions );

app.patch("/users/:userId/missions/:missionId/complete", handleCompleteUserMission);

// /* 전역 오류를 처리하기 위한 미들웨어 */
// app.use((err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }

//   res.status(err.statusCode || 500).error({
//     errorCode: err.errorCode || "unknown",
//     reason: err.reason || err.message || null,
//     data: err.data || null,
//   });
// });

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  
  // 오류 응답 전달
  res.status(err.statusCode || 500).json({
    resultType: "FAIL",
    error: {
      errorCode: err.errorCode || "unknown",
      reason: err.reason || err.message || null,
      data: err.data || null,
    },
    success: null
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});