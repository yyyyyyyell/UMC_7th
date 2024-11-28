import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToLogin } from "../dtos/user.dto.js";
import { signUpUser, loginUser } from '../services/user.service.js'
// import { userSignUp } from "../services/user.service.js";

// export const handleUserSignUp = async (req, res, next) => {
//   console.log("회원가입을 요청했습니다!");
//   console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

//   const user = await userSignUp(bodyToUser(req.body));

//   res.status(StatusCodes.OK).success(user);
// };

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              account: { type: "string" },
              password: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  account: { type: "string" },
                  name: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

  console.log("회원가입 요청!");

  const { account, password, name, gender, birth } = req.body;

  // 입력값 검증
  if (!account || !password || !name || !gender || !birth) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      resultType: 'FAIL',
      error: { errorCode: 'INVALID_INPUT', reason: '모든 필드를 입력하세요.' }
    });
  }

  try {
    // DTO를 사용하여 요청 본문을 변환하고, Service 함수 호출
    const newUser = await signUpUser(bodyToUser(req.body)); // signUpUser 결과를 newUser에 할당

    // 회원가입 성공 시, 사용자 정보 응답
    res.status(StatusCodes.CREATED).json({
      resultType: 'SUCCESS',
      message: '회원가입 성공',
      success: {
        account: newUser.account,
        name: newUser.name
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      resultType: 'FAIL',
      error: { errorCode: error.errorCode || 'UNKNOWN_ERROR', reason: error.message }
    });
  }
};

export const handleLogin = async (req, res) => {
  /*
    #swagger.summary = '사용자 로그인 API';
    #swagger.description = '이메일과 비밀번호로 사용자 로그인을 처리합니다.';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              account: { type: 'string', example: 'user@example.com' },
              password: { type: 'string', example: 'password123' }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '로그인 성공',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              message: { type: 'string', example: '로그인 성공' }
            }
          }
        }
      }
    };
    #swagger.responses[401] = {
      description: '로그인 실패',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'INVALID_PASSWORD' },
                  reason: { type: 'string', example: '비밀번호가 올바르지 않습니다.' }
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("로그인 요청!");

  const { account, password } = req.body;

  try {
    const loginResult = await loginUser(bodyToLogin(req.body));
    req.session.userId = loginResult.userId;
    res.cookie('sessionId', req.session.id, { maxAge: 1000 * 60 * 60 * 24 });
    res.status(StatusCodes.OK).json({ resultType: 'SUCCESS', message: '로그인 성공' });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      resultType: 'FAIL',
      error: { errorCode: error.errorCode || 'UNKNOWN_ERROR', reason: error.message }
    });
  }
};