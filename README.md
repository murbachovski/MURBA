# MURBA

사람들이 실제로 쓰는 한국어를 배우는 글로벌 웹 서비스입니다.
외국인 학습자가 AI 튜터와 일상 대화·드라마 대사·여행 표현을 연습하고, 직접 쓴 "표현 노트"를 읽을 수 있습니다.

- 언어: English · 한국어 · 日本語 · Español (브라우저 언어에 맞춰 자동 이동)
- 수익 모델: 무료 사용 + Google AdSense 광고 → 이후 Pro 구독(광고 제거, 무제한 연습)

## 구성

| 경로 | 내용 |
|---|---|
| `/[lang]` | 랜딩 페이지 |
| `/[lang]/tutor` | AI 튜터 채팅 (Claude API, 스트리밍) |
| `/[lang]/phrases` | 표현 노트 목록 · 상세 (`src/content/phrases.ts`) |
| `/[lang]/pricing` | 요금 (Free / Pro 준비 중) |
| `/[lang]/privacy` | 개인정보 처리방침 (AdSense 심사 필수) |
| `/api/chat` | 튜터 API. 브라우저당 하루 무료 메시지 수 제한 |
| `/ads.txt`, `/robots.txt`, `/sitemap.xml` | 광고·검색 노출용 |

번역 문구는 `src/app/[lang]/dictionaries/*.json`에 있습니다.

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # ANTHROPIC_API_KEY 입력
npm run dev                  # http://localhost:3000
```

## Vercel 배포

1. [vercel.com](https://vercel.com)에서 GitHub로 로그인 → **Add New → Project** → `MURBA` 저장소 Import
2. Framework는 Next.js로 자동 인식됩니다. 그대로 두세요.
3. **Environment Variables**에 최소 `ANTHROPIC_API_KEY` 추가 → **Deploy**
4. 이후 `main` 브랜치에 push하면 자동 배포, PR마다 미리보기 URL이 생깁니다.
5. 도메인을 사면 **Settings → Domains**에서 연결하고 `NEXT_PUBLIC_SITE_URL`을 그 주소로 설정 후 재배포하세요.

## Google AdSense 연결

광고 코드는 이미 들어 있고, 환경변수를 넣으면 켜집니다.

1. 사이트를 먼저 배포하고, 가능하면 **자체 도메인**을 연결합니다. (승인에 유리)
2. [adsense.google.com](https://adsense.google.com)에서 가입 → 사이트 추가
3. 게시자 ID `ca-pub-4907615583667816`은 코드(`src/lib/ads.ts`)에 기본값으로 들어 있습니다.
   → 모든 페이지 `<head>`에 AdSense 코드와 `google-adsense-account` 메타 태그가 들어가고, `/ads.txt`가 자동 생성됩니다.
4. AdSense에서 **사이트 소유권 확인 → 검토 요청**
5. 승인 후 **광고 → 광고 단위 기준 → 디스플레이 광고**를 3개 만들고, 각 슬롯 ID를
   `NEXT_PUBLIC_ADSENSE_SLOT_HOME`, `_PHRASES`, `_TUTOR`에 넣고 재배포
   (또는 AdSense의 **자동 광고**만 켜도 됩니다)
6. 유럽(EEA)·영국·스위스 방문자에게 맞춤 광고를 보여 주려면 Google 인증 CMP가 필요합니다.
   AdSense의 **개인 정보 보호 및 메시지** 메뉴에서 GDPR 동의 메시지를 켜면 됩니다.

심사 팁: AdSense는 "가치가 낮은 콘텐츠"를 가장 많이 거절합니다. 표현 노트를 꾸준히 늘려 주세요.
AI가 쓴 글을 그대로 올리기보다, 직접 경험과 예문을 덧붙여 손보는 것이 좋습니다.

## 방문자 통계

Vercel 대시보드 → 프로젝트 → **Analytics** 탭에서 **Enable**을 누르면 방문자 수, 유입 경로, 국가별 통계가 쌓입니다.
쿠키를 쓰지 않는 방식이라 별도 동의 배너가 필요 없습니다.

## 구글 검색 등록 (Search Console)

1. [search.google.com/search-console](https://search.google.com/search-console)에서 **URL 접두어**로 `https://murba.vercel.app` 추가
2. 확인 방법 **HTML 태그**를 고르고, `content="…"` 안의 값만 Vercel 환경변수 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`에 넣고 재배포 → **확인**
3. **Sitemaps** 메뉴에 `sitemap.xml` 제출

## 공유 이미지 (카카오톡·X·인스타그램 미리보기)

링크를 공유하면 사이트 카드와 표현 노트별 카드가 자동으로 붙습니다 (`opengraph-image.tsx`).
카드에 쓰는 글꼴 `assets/fonts/GowunBatang-Bold-og.ttf`(OFL)는 용량을 줄이려고 라틴 문자와 상용 한글 2,350자만 담았습니다.
새 표현 노트 제목에 드문 글자가 들어가면 카드에서 빈 칸으로 보일 수 있으니, 그때는 원본 글꼴에서 다시 추려 주세요.

## 비용 메모 · Haiku 전환 기준

튜터는 지금 `claude-opus-5-5`를 쓰고 답변을 짧게(effort `low`) 유지합니다. 초기에는 답변 품질로 첫인상을 잡는 게 중요해서입니다.
아래 중 하나에 해당하면 "안정 구간"으로 보고 Vercel 환경변수 `CLAUDE_MODEL=claude-haiku-5-5`로 바꾼 뒤 재배포합니다. 코드 수정은 필요 없습니다.

- 한 달 AI 비용(Anthropic 콘솔 → Usage)이 광고 + 구독 수익을 넘을 때
- 월 방문자가 3,000명을 넘어 사용량이 꾸준해졌을 때
- 하루 튜터 메시지가 1,000개를 넘을 때

바꾼 뒤 일주일은 튜터 답변을 직접 몇 개 확인해 품질이 괜찮은지 봐 주세요.
사용자가 늘면 `CLAUDE_MODEL`, `FREE_DAILY_LIMIT`로 비용을 조절할 수 있습니다.
무료 사용량 제한은 쿠키 기반이라 우회가 가능합니다. 트래픽이 커지면 계정과 서버 측 제한(예: Upstash Redis)을 붙이세요.
