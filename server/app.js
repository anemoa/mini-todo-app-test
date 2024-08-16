const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// router 위에 cors 작성할것!
// 모든 서버에서 보내는 요청을 수락.
app.use(cors());

const todoRouter = require('./routes/todo');
const { sequelize } = require('./models');
app.use('/api', todoRouter); // 기본 주소 : localhost:PORT/api


app.get('/', (req, res) => {
    res.send('hello');
});

app.get('*', (_, res) => {
    res.send('404 Error!');
})

const port = process.env.PORT || 8080;

sequelize.sync({force: false}).then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
});

/*
    sequelize.sync({force: false})
    - 이미 존재하는 테이블이 있다면 그 테이블을 지우지 않고 유지
    - 새로운 테이블을 추가하거나 필요한 경우 스키마를 업데이트

    - 서버가 시작되기 전에 Sequelize를 사용하여 DB와 모델 간의 동기화 수행
    sync가 완료되고 난 후에야 then 실행

*/


/* 
    SOP(동일 출처 정책), CORS() // <-- CORS 관련해서 궁금하면 검색해보기
    Cors를 사용하는 방법

    #1. 모든 출처에서의 요청을 허용
    app.use(cors());

    #2. 특정 출처에서의 요청만 허용
    app.use(cors({
        origin: 'https://ex.com'
    }))

    #3. 특정 옵션만 설정
    app.use(cors({
        origin: ['https://ex.com', ''https://ex2.com''],
        methods: ['GET', 'POST']
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
*/