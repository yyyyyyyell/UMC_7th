// 목데이터 삽입 쿼리문

const connection = require('./db'); // db.js에서 연결 설정 가져오기

const insertMockData = () => {
    const insertQueries = `
        INSERT INTO book_category (id, name, created_at, updated_at) VALUES
        (1, '소설', NOW(), NOW()),
        (2, '과학', NOW(), NOW()),
        (3, '자기계발', NOW(), NOW()),
        (4, '판타지', NOW(), NOW()),
        (5, '역사', NOW(), NOW()),
        (6, '철학', NOW(), NOW()),
        (7, '경제', NOW(), NOW()),
        (8, '심리학', NOW(), NOW()),
        (9, '소설', NOW(), NOW()),
        (10, '과학소설', NOW(), NOW()),
        (11, '예술', NOW(), NOW()),
        (12, '사회학', NOW(), NOW()),
        (13, '기술', NOW(), NOW()),
        (14, '문학', NOW(), NOW()),
        (15, '전기', NOW(), NOW());

        -- book 테이블에 더미 데이터 삽입
        INSERT INTO book (id, name, description, created_at, updated_at) VALUES
        (1, '책 제목 1', '책 설명 1', NOW(), NOW()),
        (2, '책 제목 2', '책 설명 2', NOW(), NOW()),
        (3, '책 제목 3', '책 설명 3', NOW(), NOW()),
        (4, '책 제목 4', '책 설명 4', NOW(), NOW()),
        (5, '책 제목 5', '책 설명 5', NOW(), NOW()),
        (6, '책 제목 6', '책 설명 6', NOW(), NOW()),
        (7, '책 제목 7', '책 설명 7', NOW(), NOW()),
        (8, '책 제목 8', '책 설명 8', NOW(), NOW()),
        (9, '책 제목 9', '책 설명 9', NOW(), NOW()),
        (10, '책 제목 10', '책 설명 10', NOW(), NOW()),
        (11, '책 제목 11', '책 설명 11', NOW(), NOW()),
        (12, '책 제목 12', '책 설명 12', NOW(), NOW()),
        (13, '책 제목 13', '책 설명 13', NOW(), NOW()),
        (14, '책 제목 14', '책 설명 14', NOW(), NOW()),
        (15, '책 제목 15', '책 설명 15', NOW(), NOW());

        -- member 테이블에 더미 데이터 삽입
        INSERT INTO member (phone_num, name, nickname, gender, created_at, updated_at, status, inactive_date) VALUES
        ('010-1234-5678', '홍길동', '길동', '남', NOW(), NOW(), '활성', NULL),
        ('010-8765-4321', '김영희', '영희', '여', NOW(), NOW(), '활성', NULL),
        ('010-1111-2222', '이철수', '철수', '남', NOW(), NOW(), '비활성', NOW()),
        ('010-2222-3333', '박민수', '민수', '남', NOW(), NOW(), '활성', NULL),
        ('010-4444-5555', '최지혜', '지혜', '여', NOW(), NOW(), '활성', NULL),
        ('010-6666-7777', '한상혁', '상혁', '남', NOW(), NOW(), '비활성', NOW()),
        ('010-8888-9999', '이수진', '수진', '여', NOW(), NOW(), '활성', NULL),
        ('010-0000-1111', '김철수', '철수', '남', NOW(), NOW(), '활성', NULL),
        ('010-2222-4444', '이영희', '영희', '여', NOW(), NOW(), '비활성', NOW()),
        ('010-5555-6666', '정민호', '민호', '남', NOW(), NOW(), '활성', NULL),
        ('010-7777-8888', '오세훈', '세훈', '남', NOW(), NOW(), '활성', NULL),
        ('010-9999-0000', '유재석', '재석', '남', NOW(), NOW(), '비활성', NOW()),
        ('010-1212-3434', '박보검', '보검', '남', NOW(), NOW(), '활성', NULL),
        ('010-1414-5656', '아이유', '아이유', '여', NOW(), NOW(), '활성', NULL),
        ('010-1717-7878', '정해인', '해인', '남', NOW(), NOW(), '비활성', NOW());

        -- rent 테이블에 더미 데이터 삽입
        INSERT INTO rent (id, book_id, member_id, created_at, updated_at) VALUES
        (1, 1, '010-1234-5678', NOW(), NOW()),
        (2, 2, '010-8765-4321', NOW(), NOW()),
        (3, 3, '010-1111-2222', NOW(), NOW()),
        (4, 4, '010-2222-3333', NOW(), NOW()),
        (5, 5, '010-4444-5555', NOW(), NOW()),
        (6, 6, '010-6666-7777', NOW(), NOW()),
        (7, 7, '010-8888-9999', NOW(), NOW()),
        (8, 8, '010-0000-1111', NOW(), NOW()),
        (9, 9, '010-2222-4444', NOW(), NOW()),
        (10, 10, '010-5555-6666', NOW(), NOW()),
        (11, 11, '010-7777-8888', NOW(), NOW()),
        (12, 12, '010-9999-0000', NOW(), NOW()),
        (13, 13, '010-1212-3434', NOW(), NOW()),
        (14, 14, '010-1414-5656', NOW(), NOW()),
        (15, 15, '010-1717-7878', NOW(), NOW());

        -- book_likes 테이블에 더미 데이터 삽입
        INSERT INTO book_likes (id, book_id, member_id, created_at, updated_at) VALUES
        (1, 1, '010-1234-5678', NOW(), NOW()),
        (2, 2, '010-8765-4321', NOW(), NOW()),
        (3, 3, '010-1111-2222', NOW(), NOW()),
        (4, 4, '010-2222-3333', NOW(), NOW()),
        (5, 5, '010-4444-5555', NOW(), NOW()),
        (6, 6, '010-6666-7777', NOW(), NOW()),
        (7, 7, '010-8888-9999', NOW(), NOW()),
        (8, 8, '010-0000-1111', NOW(), NOW()),
        (9, 9, '010-2222-4444', NOW(), NOW()),
        (10, 10, '010-5555-6666', NOW(), NOW()),
        (11, 11, '010-7777-8888', NOW(), NOW()),
        (12, 12, '010-9999-0000', NOW(), NOW()),
        (13, 13, '010-1212-3434', NOW(), NOW()),
        (14, 14, '010-1414-5656', NOW(), NOW()),
        (15, 15, '010-1717-7878', NOW(), NOW());

        -- hash_tag 테이블에 더미 데이터 삽입
        INSERT INTO hash_tag (id, name, created_at, updated_at) VALUES
        (1, '#소설', NOW(), NOW()),
        (2, '#과학', NOW(), NOW()),
        (3, '#자기계발', NOW(), NOW()),
        (4, '#판타지', NOW(), NOW()),
        (5, '#역사', NOW(), NOW()),
        (6, '#철학', NOW(), NOW()),
        (7, '#경제', NOW(), NOW()),
        (8, '#심리학', NOW(), NOW()),
        (9, '#소설', NOW(), NOW()),
        (10, '#과학소설', NOW(), NOW()),
        (11, '#예술', NOW(), NOW()),
        (12, '#사회학', NOW(), NOW()),
        (13, '#기술', NOW(), NOW()),
        (14, '#문학', NOW(), NOW()),
        (15, '#전기', NOW(), NOW());

        INSERT INTO book_hash_tag (id, book_id, hash_tag_id) VALUES
        (1, 1, 1),
        (2, 1, 2),
        (3, 2, 2),
        (4, 2, 3),
        (5, 3, 3),
        (6, 3, 4),
        (7, 4, 4),
        (8, 4, 5),
        (9, 5, 5),
        (10, 5, 6),
        (11, 6, 6),
        (12, 6, 7),
        (13, 7, 7),
        (14, 8, 8),
        (15, 9, 9),
        (16, 10, 10),
        (17, 11, 11),
        (18, 12, 12),
        (19, 13, 13),
        (20, 14, 14),
        (21, 15, 15);

        INSERT INTO notice_alarm (id, user_id, is_confirmed, created_at, updated_at, title, body) VALUES
        (1, 1, TRUE, NOW(), NOW(), '공지사항 제목 1', '공지사항 내용 1'),
        (2, 2, FALSE, NOW(), NOW(), '공지사항 제목 2', '공지사항 내용 2'),
        (3, 3, TRUE, NOW(), NOW(), '공지사항 제목 3', '공지사항 내용 3'),
        (4, 4, FALSE, NOW(), NOW(), '공지사항 제목 4', '공지사항 내용 4'),
        (5, 5, TRUE, NOW(), NOW(), '공지사항 제목 5', '공지사항 내용 5'),
        (6, 6, FALSE, NOW(), NOW(), '공지사항 제목 6', '공지사항 내용 6'),
        (7, 7, TRUE, NOW(), NOW(), '공지사항 제목 7', '공지사항 내용 7'),
        (8, 8, FALSE, NOW(), NOW(), '공지사항 제목 8', '공지사항 내용 8'),
        (9, 9, TRUE, NOW(), NOW(), '공지사항 제목 9', '공지사항 내용 9'),
        (10, 10, FALSE, NOW(), NOW(), '공지사항 제목 10', '공지사항 내용 10');

        -- marketing_alarm 테이블에 더미 데이터 삽입
        INSERT INTO marketing_alarm (id, user_id, is_confirmed, created_at, updated_at, title, body) VALUES
        (1, 1, TRUE, NOW(), NOW(), '마케팅 알림 제목 1', '마케팅 알림 내용 1'),
        (2, 2, FALSE, NOW(), NOW(), '마케팅 알림 제목 2', '마케팅 알림 내용 2'),
        (3, 3, TRUE, NOW(), NOW(), '마케팅 알림 제목 3', '마케팅 알림 내용 3'),
        (4, 4, FALSE, NOW(), NOW(), '마케팅 알림 제목 4', '마케팅 알림 내용 4'),
        (5, 5, TRUE, NOW(), NOW(), '마케팅 알림 제목 5', '마케팅 알림 내용 5'),
        (6, 6, FALSE, NOW(), NOW(), '마케팅 알림 제목 6', '마케팅 알림 내용 6'),
        (7, 7, TRUE, NOW(), NOW(), '마케팅 알림 제목 7', '마케팅 알림 내용 7'),
        (8, 8, FALSE, NOW(), NOW(), '마케팅 알림 제목 8', '마케팅 알림 내용 8'),
        (9, 9, TRUE, NOW(), NOW(), '마케팅 알림 제목 9', '마케팅 알림 내용 9'),
        (10, 10, FALSE, NOW(), NOW(), '마케팅 알림 제목 10', '마케팅 알림 내용 10');
    `;

    connection.query(insertQueries, (err, results) => {
        if (err) {
            console.error('목데이터 삽입 오류:', err);
            return;
        }
        console.log('목데이터 삽입 완료:', results);
    });
};

insertMockData(); // 함수 실행
