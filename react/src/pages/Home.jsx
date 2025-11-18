import Layout from "../components/studio/layout/Layout";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Components from "../components/sections/Components";

/**
 * Home Page
 * 바닐라 index.html의 React 버전
 */
function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Components />
    </Layout>
  );
}

export default Home;
