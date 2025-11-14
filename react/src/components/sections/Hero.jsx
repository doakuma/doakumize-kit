import { Link } from "react-router-dom";

/**
 * Hero Section
 * 메인 타이틀과 설명
 */
function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <h1 className="text-h1">Component Studio</h1>
        <p className="text-body-lg">
          같은 컴포넌트를 반복해서 만드는 수고를 덜고
          <br />
          CSS Variables로 손쉽게 커스터마이징하여
          <br />
          빠르게 프로젝트에 적용할 수 있습니다
        </p>
        <div className="btn-group">
          <Link to="/components" className="btn btn--primary">
            컴포넌트 둘러보기
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
