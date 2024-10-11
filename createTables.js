// 테이블 생성 쿼리문


const createTables = () => {
    const tableQueries = `
        CREATE TABLE IF NOT EXISTS book_category (
            id BIGINT PRIMARY KEY,
            name VARCHAR(20),
            created_at DATETIME(6),
            updated_at DATETIME(6)
        );

    CREATE TABLE IF NOT EXISTS book (
        id BIGINT PRIMARY KEY,
        name VARCHAR(40),
        description TEXT,
        created_at DATETIME(6),
        updated_at DATETIME(6)
    );

    CREATE TABLE IF NOT EXISTS member (
        phone_num VARCHAR(15) PRIMARY KEY,
        name VARCHAR(10),
        nickname VARCHAR(20),
        gender VARCHAR(10),
        created_at DATETIME(6),
        updated_at DATETIME(6),
        status VARCHAR(10),
        inactive_date DATETIME(6)
        // 원래 15였는데 mysql에서 지원 안해서 6으로 변경함
    );

    CREATE TABLE IF NOT EXISTS rent (
        id BIGINT PRIMARY KEY,
        book_id BIGINT,
        member_id VARCHAR(15),
        created_at DATETIME(6),
        updated_at DATETIME(6),
        FOREIGN KEY (book_id) REFERENCES book(id),
        FOREIGN KEY (member_id) REFERENCES member(phone_num)
    );

    CREATE TABLE IF NOT EXISTS book_likes (
        id BIGINT PRIMARY KEY,
        book_id BIGINT,
        member_id VARCHAR(15),
        created_at DATETIME(6),
        updated_at DATETIME(6),
        FOREIGN KEY (book_id) REFERENCES book(id),
        FOREIGN KEY (member_id) REFERENCES member(phone_num)
    );

    CREATE TABLE IF NOT EXISTS hash_tag (
        id BIGINT PRIMARY KEY,
        name VARCHAR(20),
        created_at DATETIME(6),
        updated_at DATETIME(6)
    );

    CREATE TABLE IF NOT EXISTS book_hash_tag (
        id BIGINT PRIMARY KEY,
        book_id BIGINT,
        hash_tag_id BIGINT,
        FOREIGN KEY (book_id) REFERENCES book(id),
        FOREIGN KEY (hash_tag_id) REFERENCES hash_tag(id)
    );

    CREATE TABLE IF NOT EXISTS notice_alarm (
        id BIGINT PRIMARY KEY,
        user_id BIGINT,
        is_confirmed BOOLEAN,
        created_at DATETIME(6),
        updated_at DATETIME(6),
        title VARCHAR(30),
        body TEXT
    );

    CREATE TABLE IF NOT EXISTS marketing_alarm (
        id BIGINT PRIMARY KEY,
        user_id BIGINT,
        is_confirmed BOOLEAN,
        created_at DATETIME(6),
        updated_at DATETIME(6),
        title VARCHAR(30),
        body TEXT
    );
`;

    connection.query(tableQueries, (err, results) => {
        if (err) {
            console.error('테이블 생성 오류:', err);
            return;
        }
        console.log('테이블 생성 완료:', results);
    });
};

// 연결 후 테이블 생성
connection.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 오류:', err.stack);
        return;
    }
    console.log('데이터베이스에 연결됨:', connection.threadId);
    createTables(); // 테이블 생성 함수 호출
});
