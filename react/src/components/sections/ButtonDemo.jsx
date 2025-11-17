import { Button } from "../ui/Button";
import "./ButtonDemo.css";

/**
 * Button Demo Section
 * Button 컴포넌트 테스트용 섹션
 */
export default function ButtonDemo() {
  return (
    <section className="button-demo">
      <div className="container">
        <h2>Button 컴포넌트 테스트</h2>
        
        <div className="button-demo__section">
          <h3>Variants</h3>
          <div className="button-demo__group">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="default">Default</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="text">Text</Button>
            <Button variant="point">Point</Button>
          </div>
        </div>

        <div className="button-demo__section">
          <h3>Sizes</h3>
          <div className="button-demo__group">
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="medium">Medium</Button>
            <Button variant="primary" size="large">Large</Button>
          </div>
        </div>

        <div className="button-demo__section">
          <h3>Disabled</h3>
          <div className="button-demo__group">
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
            <Button variant="default" disabled>Disabled Default</Button>
          </div>
        </div>

        <div className="button-demo__section">
          <h3>Circle</h3>
          <div className="button-demo__group">
            <Button variant="primary" circle>Circle Button</Button>
            <Button variant="secondary" circle size="small">Small Circle</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

