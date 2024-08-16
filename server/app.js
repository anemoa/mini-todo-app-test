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
app.use('/api', todoRouter); // 기본 주소 : localhost:PORT/api


app.get('/', (req, res) => {
    res.send('hello');
});

app.get('*', (_, res) => {
    res.send('404 Error!');
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

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