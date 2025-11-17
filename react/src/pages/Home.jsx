import Layout from "../components/layout/Layout";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import ButtonDemo from "../components/sections/ButtonDemo";

/**
 * Home Page
 * 바닐라 index.html의 React 버전
 */
function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <ButtonDemo />
    </Layout>
  );
}

export default Home;
