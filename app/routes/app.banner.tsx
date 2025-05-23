import React from "react";

export default function BannerShowcase() {
  const headingStyle = {
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    margin: "0px",
    lineHeight: "12px",
    fontSize: "12px",
    letterSpacing: "0px",
    fontWeight: "600",
    color: "rebeccapurple"
  };

  return (
    <div className="layout">
      <h2 style={headingStyle}>Default</h2>
      <s-banner>Out of stock</s-banner>

      <h2 style={headingStyle}>Tone</h2>
      <s-banner tone="auto" heading="Auto" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="info" heading="Info" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="success" heading="Success" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="warning" heading="Warning" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="critical" heading="Critical" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="auto" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="info" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="success" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="warning" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      <s-banner tone="critical" dismissible="">Message. <s-link>Link text</s-link></s-banner>

      <h2 style={headingStyle}>In Section</h2>
      <s-section accessibilitylabel="This is a card">
        <s-banner tone="auto" heading="Title" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="info" heading="Title" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="success" heading="Title" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="warning" heading="Title" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="critical" heading="Title" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="auto" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="info" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="success" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="warning" dismissible="">Message. <s-link>Link text</s-link></s-banner>
        <s-banner tone="critical" dismissible="">Message. <s-link>Link text</s-link></s-banner>
      </s-section>

      <h2 style={headingStyle}>With actions</h2>
      <s-banner id="banner-with-actions" tone="info" heading="Title">Message. <s-link>Link text</s-link><div slot="secondary-actions" style={{ display: "contents" }}><s-button>Action</s-button></div></s-banner>
      <s-banner id="banner-with-actions" tone="critical" heading="Title">Message. <s-link>Link text</s-link><div slot="secondary-actions" style={{ display: "contents" }}><s-button>Action</s-button><s-button>Action</s-button></div></s-banner>
      <s-section heading="In card">
        <s-banner tone="success" heading="Title" dismissible="">Message. <s-link>Link text</s-link><div slot="secondary-actions" style={{ display: "contents" }}><s-button>Action</s-button></div></s-banner>
        <s-banner tone="critical" heading="Title" dismissible="">Message. <s-link>Link text</s-link><div slot="secondary-actions" style={{ display: "contents" }}><s-button>Action</s-button><s-button>Action</s-button></div></s-banner>
      </s-section>

      <h2 style={headingStyle}>With short text and no heading</h2>
      <s-banner id="banner-with-actions" tone="success">Hello world<div slot="secondary-actions" style={{ display: "contents" }}><s-button>Action with really really long text</s-button><s-button>Action with really really long text</s-button></div></s-banner>

      <h2 style={headingStyle}>With long text and no heading</h2>
      <s-banner id="banner-with-actions" tone="success">Compose, customize, and extend every part of the commerce stack—from storefront to checkout to backend integrations—and create unique experiences for your brand or millions of merchants around the world. <s-link>Link text</s-link><div slot="secondary-actions" style={{ display: "contents" }}><s-button>Action with really really long text</s-button><s-button>Action with really really long text</s-button></div></s-banner>

      <h2 style={headingStyle}>Alignment</h2>
      <s-banner heading="Heading" dismissible="">One or more items in this order were assigned to a fulfillment location without enough inventory to ship to the customer. Prevent this behavior by changing your fulfillable inventory setting to sell only within configured shipping zones. Learn more<div slot="secondary-actions" style={{ display: "contents" }}><s-button>Button</s-button></div></s-banner>
      <s-banner dismissible="">One or more items in this order were assigned to a fulfillment location without enough inventory to ship to the customer. Prevent this behavior by changing your fulfillable inventory setting to sell only within configured shipping zones. Learn more</s-banner>
      <s-banner dismissible="">Single line of text</s-banner>
      <s-banner dismissible="">One or more items in this order were assigned to a fulfillment location without enough inventory to ship to the customer. Prevent this behavior by changing your fulfillable inventory setting to sell only within configured shipping zones. Learn more<div slot="secondary-actions" style={{ display: "contents" }}><s-button>Button</s-button></div></s-banner>
      <s-banner dismissible="">Single line of text<div slot="secondary-actions" style={{ display: "contents" }}><s-button>Button</s-button></div></s-banner>
    </div>
  );
}