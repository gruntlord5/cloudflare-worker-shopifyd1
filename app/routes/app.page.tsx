import React from "react";

export default function PageLayoutShowcase() {
  const monoFontStyle = {
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    margin: "0px",
    lineHeight: "12px",
    fontSize: "12px",
    letterSpacing: "0px"
  };

  const headingStyle = {
    ...monoFontStyle,
    fontWeight: "600",
    color: "rebeccapurple"
  };

  const paragraphStyle = {
    ...monoFontStyle,
    fontWeight: "450",
    color: "rgb(0, 98, 98)"
  };

  const outlineVioletStyle = {
    outline: "violet dotted 1px",
    display: "block"
  };

  const outlineVioletWithPaddingStyle = {
    ...outlineVioletStyle,
    padding: "1rem 0px"
  };

  const outlineOrangeStyle = {
    outline: "orange dotted 1px",
    display: "block"
  };

  return (
        <s-page>
          <s-banner tone="success">Added a new customer</s-banner>
          <s-section>
            <s-heading>Heading</s-heading>
            <s-paragraph>Paragraph</s-paragraph>
          </s-section>
          <div slot="aside" style={{ display: "contents" }}>
            <s-section>
              <s-heading>Order</s-heading>
              <s-paragraph>Order details</s-paragraph>
            </s-section>
            <s-section heading="Customer" accessibilitylabel="Heading on L1">
              <s-section heading="Contact information">
                <s-paragraph>rami.harb@email.com</s-paragraph>
                <s-paragraph>+81 60-382-4116</s-paragraph>
                <s-paragraph color="subdued">Will receive notifications in English</s-paragraph>
              </s-section>
              <s-section heading="Personal address">
                <s-paragraph>Japan 321-0106</s-paragraph>
                <s-paragraph>Tokyo, Minato-ku</s-paragraph>
                <s-paragraph>20-20, Shiba 5-chome</s-paragraph>
                <s-paragraph>Watanabe Asuka</s-paragraph>
              </s-section>
            </s-section>
          </div>
        </s-page>
  );
}