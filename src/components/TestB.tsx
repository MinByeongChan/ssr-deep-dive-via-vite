
export const TestB = () => {
  return (
    <>
    <header
    id="member_header">
    <div className="h_container">
      <div className="head_link">
        <a
          href="#"
          className="page_back">
          <span className="blind">뒤로가기</span>
        </a>
      </div>
      <a
        href="#"
        className="page_depth">
        로그인
      </a>
    </div>
  </header>
  
  <div className="contents side_padding login_wrap sns_login">
    <div className="login_text">
      <p>
        간편 로그인 연동을 위해 <br /> 코웨이 로그인이 필요합니다.
      </p>
    </div>

    <div className="login_form">
      <form>
        <div>
          <input
            id="username"
            name="username"
            value=""
            type="text"
            autoComplete="off"
            className="input_text"
            tabIndex={0}
            placeholder="이메일 혹은 휴대폰 번호"
          />
          <button
            type="button"
            className="save_btn"
            tabIndex={0}>
            <span>저장</span>
          </button>
        </div>

        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            className="input_text"
            tabIndex={0}
            placeholder="비밀번호"
          />
        </div>

        <p className="member_error_msg">정확한 이메일 주소 혹은 휴대폰 번호를 입력해 주세요.</p>

        <div className="btn_wrap">
          <button
            id="login-btn"
            color="btnBlack">
            <span>로그인</span>
          </button>
        </div>
      </form>
    </div>

    <div className="login_find">
      <a
        href="javascript:void(0);"
        id="find-id">
        아이디 찾기
      </a>
      <a
        href="javascript:void(0);"
        id="find-password">
        비밀번호 찾기
      </a>
    </div>

    <ul className="list_type3">
      <i className="top_txt">코웨이 계정이 없을 경우 회원가입 &gt; 로그인 후 아래 경로를 통해 간편 로그인 연동을 해주세요.</i>
      <li>코웨이닷컴 : 마이코웨이 &gt; 회원정보관리 &gt; 간편 로그인 연동 관리</li>
      <li>IoCare : 마이페이지 &gt; 내 정보 조회 &gt; 간편 로그인 연동 관리</li>
      <i className="bot_txt">(주의) 팝업이 차단 된 경우 팝업 차단을 해제하셔야 합니다.</i>
    </ul>
  </div>
  
  
  </>

  )
}