# AI-Chat

**카카오 KoGPT와 대화하는 AI 채팅앱 입니다.**

[사이트 링크](https://ai-chat-lemon.vercel.app/)

## 기술 스택

`Next.js` `TypeScript` `SWR` `TailwindCSS`

## 설치 및 실행

### 설치

`npm install`

### 실행

1. 카카오 API Key 발급

   > [https://developers.kakao.com/](https://developers.kakao.com/)

2. `.env.local` 파일 생성

   ```bash
   KAKAO_API_KEY="Key"
   ```

3. 실행

   `npm run dev`

## 구현 기능

- KoGPT REST API
- AI 응답 타이핑 효과
- 채팅 전송 시 스크롤 이동

## KoGPT REST API

**KoGPT API는 REST API 방식으로 사용 가능합니다.**

> https://developers.kakao.com/docs/latest/ko/kogpt/rest-api

### 요청

- Method: `POST`
- URL: `https://api.kakaobrain.com/v1/inference/kogpt/generation`
- Query
  - prompt: string
  - max_tokens: number
  - temperature: number

```ts
// pages/api/ai.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Answer | Error>
) {
  if (req.method === 'POST') {
    try {
      const { question } = req.body;
      const instance = axios.create({
        baseURL: 'https://api.kakaobrain.com',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${API_KEY}`,
        },
      });
      const response = await instance.post('/v1/inference/kogpt/generation', {
        prompt: `질문에 답하세요.\nQ: ${question || ''} A:`,
        max_tokens: Math.floor(Math.random() * (100 - 1)) + 1,
        temperature: 0.3,
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'API 호출에 실패했습니다.' });
    }
  }
}
```

KoGPT가 생성한 결과의 길이는 `max_tokens`쿼리 값 길이로 결정되서 100 이하의 랜덤한 수로 설정 하였습니다.

### 응답

> https://developers.kakao.com/docs/latest/ko/kogpt/rest-api#request-response

## API

### 요청

- URL: `/api/ai`
- Method: `POST`
- Body:
  - question: string

## 타이핑 효과

```ts
// components/chat/Answer.tsx
const [text, setText] = useState('');
const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setText((prev) => prev + answer[count]);
    setCount((prev) => prev + 1);
  }, 10);

  if (count === answer.length) {
    clearInterval(interval);
    scrollHandler();
  }
  return () => clearInterval(interval);
});
```

## 스크롤 이동 기능

```ts
// components/chat/MessageList.tsx
const ref = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  ref.current?.scrollTo({
    top: ref.current?.scrollHeight,
    behavior: 'smooth',
  });
};

useEffect(() => {
  scrollToBottom();
});
```
