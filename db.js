// MySQL 모듈 로드
const mysql = require('mysql2');

// 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: 'localhost', // MySQL 호스트 (로컬 개발 시 'localhost' 사용)
    user: 'root', // MySQL 사용자 이름
    password: 'root', // MySQL 비밀번호
    database: 'UMC_4week' // 사용할 데이터베이스 이름
});

// 연결 확인
connection.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 오류:', err.stack);
        return;
    }
    console.log('데이터베이스에 연결됨:', connection.threadId);
});

module.exports = connection;
