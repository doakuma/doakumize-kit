/**
 * Table Component Data
 * 테이블 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Table 데이터 등록
window.ComponentData.table = {
  type: "table",
  id: "componentTable",
  title: "Table Components",
  variants: [
    {
      title: "Sticky Header + Scrollable Body",
      description: "thead는 고정되고, tbody는 지정 높이에서 스크롤됩니다.",
      items: [
        {
          preview: `<div class="table-wrapper">
  <div class="table-container">
    <table class="table">
      <colgroup>
        <col class="col-w-160" />
        <col class="col-w-160" />
        <col />
        <col class="col-w-160" />
        <col class="col-w-120" />
        <col class="col-w-100" />
      </colgroup>
      <thead>
        <tr>
          <th>API 이름</th>
          <th>모델</th>
          <th>설명</th>
          <th>시스템</th>
          <th>모드</th>
          <th>최종 수정자</th>
        </tr>
      </thead>
      <tbody>
        <!-- 데모용 반복 행 -->
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">API Name</a>
          </td>
          <td>API Model</td>
          <td class="text-ellipsis">
            API 설명 영역입니다.
          </td>
          <td>System Name</td>
          <td>Agent</td>
          <td>김개발</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
          label: "thead sticky / tbody scroll",
        },
      ],
    },
    {
      title: "DataTables 라이브러리 활용",
      items: [
        {
          preview: `<div class="table-wrapper">
  <div class="table-container">
    <table id="exampleDataTable" class="table" style="width: 100%">
      <thead>
        <tr>
          <th>API 이름</th>
          <th>모델</th>
          <th>설명</th>
          <th>시스템</th>
          <th>모드</th>
          <th>최종 수정자</th>
          <th>생성일</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a class="text-link" href="#">고객 상담 API</a>
          </td>
          <td>GPT-4</td>
          <td>고객 문의에 대한 자동 응답 시스템</td>
          <td>CS System</td>
          <td>Agent</td>
          <td>김민수</td>
          <td>2024-01-15</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">문서 요약 API</a>
          </td>
          <td>Claude 3</td>
          <td>긴 문서를 짧게 요약하는 기능</td>
          <td>Document System</td>
          <td>Assistant</td>
          <td>박지영</td>
          <td>2024-01-18</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">코드 리뷰 API</a>
          </td>
          <td>GPT-4</td>
          <td>소스 코드 분석 및 개선 제안</td>
          <td>Dev System</td>
          <td>Agent</td>
          <td>이철수</td>
          <td>2024-02-01</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">번역 API</a>
          </td>
          <td>Gemini Pro</td>
          <td>다국어 번역 서비스</td>
          <td>Translation System</td>
          <td>Tool</td>
          <td>최영희</td>
          <td>2024-02-05</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">이미지 분석 API</a>
          </td>
          <td>GPT-4 Vision</td>
          <td>이미지 내용 분석 및 설명</td>
          <td>Vision System</td>
          <td>Assistant</td>
          <td>정태훈</td>
          <td>2024-02-10</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">데이터 분석 API</a>
          </td>
          <td>Claude 3</td>
          <td>데이터 패턴 분석 및 인사이트 도출</td>
          <td>Analytics System</td>
          <td>Agent</td>
          <td>강서연</td>
          <td>2024-02-15</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">메일 자동 응답 API</a>
          </td>
          <td>GPT-3.5</td>
          <td>이메일 자동 답변 생성</td>
          <td>Email System</td>
          <td>Assistant</td>
          <td>윤동현</td>
          <td>2024-02-20</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">회의록 작성 API</a>
          </td>
          <td>Claude 3</td>
          <td>회의 내용 요약 및 액션 아이템 추출</td>
          <td>Meeting System</td>
          <td>Agent</td>
          <td>한지우</td>
          <td>2024-02-25</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">감성 분석 API</a>
          </td>
          <td>GPT-4</td>
          <td>텍스트의 감정 및 톤 분석</td>
          <td>Sentiment System</td>
          <td>Tool</td>
          <td>임소영</td>
          <td>2024-03-01</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">FAQ 자동 생성 API</a>
          </td>
          <td>Gemini Pro</td>
          <td>문서에서 자주 묻는 질문 추출</td>
          <td>FAQ System</td>
          <td>Assistant</td>
          <td>신재민</td>
          <td>2024-03-05</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">SQL 쿼리 생성 API</a>
          </td>
          <td>GPT-4</td>
          <td>자연어를 SQL 쿼리로 변환</td>
          <td>Database System</td>
          <td>Tool</td>
          <td>오준석</td>
          <td>2024-03-10</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">챗봇 API</a>
          </td>
          <td>Claude 3</td>
          <td>대화형 고객 지원 봇</td>
          <td>Chatbot System</td>
          <td>Agent</td>
          <td>서민지</td>
          <td>2024-03-15</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">제품 추천 API</a>
          </td>
          <td>GPT-4</td>
          <td>사용자 선호도 기반 제품 추천</td>
          <td>Recommendation System</td>
          <td>Assistant</td>
          <td>배현우</td>
          <td>2024-03-20</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">스팸 필터 API</a>
          </td>
          <td>GPT-3.5</td>
          <td>스팸 메시지 탐지 및 필터링</td>
          <td>Security System</td>
          <td>Tool</td>
          <td>전수빈</td>
          <td>2024-03-25</td>
        </tr>
        <tr>
          <td>
            <a class="text-link" href="#">키워드 추출 API</a>
          </td>
          <td>Claude 3</td>
          <td>텍스트에서 주요 키워드 추출</td>
          <td>NLP System</td>
          <td>Tool</td>
          <td>남궁민</td>
          <td>2024-03-30</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
          label: "DataTables",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Table data registered");
