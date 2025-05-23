import React from "react";

export default function ComponentShowcase() {
  return (
    <s-page inlinesize="large">
      <h2 style={{
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        margin: "0px",
        lineHeight: "12px",
        fontSize: "12px",
        letterSpacing: "0px",
        fontWeight: "600",
        color: "rebeccapurple"
      }}>
        Sections
      </h2>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', alignItems: 'start' }}>
        <s-section heading="Section level 1">
          <s-paragraph>Out of stock</s-paragraph>
        </s-section>
        
        <s-section heading="Conversion summary">
          <s-paragraph>There aren't any conversion details available for this order.</s-paragraph>
        </s-section>
      </div>

      <h2 style={{
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        margin: "0px",
        lineHeight: "12px",
        fontSize: "12px",
        letterSpacing: "0px",
        fontWeight: "600",
        color: "rebeccapurple"
      }}>
        Padding
      </h2>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', alignItems: 'start' }}>
        <s-section padding="none" accessibilitylabel="Padding">
          <s-paragraph>Padding: none</s-paragraph>
        </s-section>
        
        <s-section padding="none" heading="Heading">
          Paragraph content and stuff
        </s-section>
        
        <s-section padding="base" accessibilitylabel="Padding">
          <s-paragraph>Padding: base</s-paragraph>
        </s-section>
        
        <s-section padding="base" heading="Heading">
          Paragraph content and stuff
        </s-section>
      </div>

      <h2 style={{
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        margin: "0px",
        lineHeight: "12px",
        fontSize: "12px",
        letterSpacing: "0px",
        fontWeight: "600",
        color: "rebeccapurple"
      }}>
        Accessibility
      </h2>
      
      <s-section heading="Accessibility label">
        <s-section heading="Heading" accessibilitylabel="Section with heading and accessibility label">
          <s-paragraph>With heading and accessibility label</s-paragraph>
        </s-section>
        
        <s-section accessibilitylabel="Section with accessibility label">
          <s-paragraph>With accessibility label</s-paragraph>
        </s-section>
        
        <s-section>
          <s-paragraph>Without heading or accessibility label</s-paragraph>
        </s-section>
      </s-section>

      <h2 style={{
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        margin: "0px",
        lineHeight: "12px",
        fontSize: "12px",
        letterSpacing: "0px",
        fontWeight: "600",
        color: "rebeccapurple"
      }}>
        Heading levels nested
      </h2>
      
      <s-section heading="1">
        <s-section heading="2">
          <s-section heading="3">
            <s-section heading="4">
              <s-section heading="5">
                <s-section heading="6">
                </s-section>
              </s-section>
            </s-section>
          </s-section>
        </s-section>
      </s-section>

      <h2 style={{
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        margin: "0px",
        lineHeight: "12px",
        fontSize: "12px",
        letterSpacing: "0px",
        fontWeight: "600",
        color: "rebeccapurple"
      }}>
        Whitespace
      </h2>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', alignItems: 'start' }}>
        <s-section>
          <s-heading>Heading</s-heading>
          <s-paragraph>Paragraph</s-paragraph>
          <s-text-field label="Text field"></s-text-field>
          <s-password-field label="Password field"></s-password-field>
          <s-url-field label="URL field"></s-url-field>
          <s-email-field label="Email field"></s-email-field>
          <s-money-field label="Money field"></s-money-field>
          <s-number-field label="Number field"></s-number-field>
          <s-text-area label="Text area"></s-text-area>
          <s-select label="Select field"></s-select>
          <s-image 
            alt="Placeholder image" 
            src="https://placehold.co/600x400" 
            inlinesize="auto" 
            objectfit="cover" 
            aspectratio="1"
          ></s-image>
          <s-divider></s-divider>
          <s-text-field label="Label"></s-text-field>
        </s-section>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <s-section>
            <s-select label="Country">
              <s-option value="US" selected="">United States</s-option>
              <s-option value="CA">Canada</s-option>
              <s-option value="MX">Mexico</s-option>
            </s-select>
            
            <s-text-field label="Company" value="Stellar Interiors"></s-text-field>
            <s-text-field label="Address" autocomplete="address-line1" value="160 East Girard Avenue"></s-text-field>
            <s-text-field label="Apartment, suite, or unit" autocomplete="address-line2" value="Apt 502"></s-text-field>
            
            <s-grid gridtemplatecolumns="repeat(3, 1fr)" gap="small">
              <s-select label="City">
                <s-option value="Philadelphia">Philadelphia</s-option>
                <s-option value="New York">New York</s-option>
                <s-option value="Los Angeles">Los Angeles</s-option>
              </s-select>
              
              <s-select label="State">
                <s-option value="PA">PA</s-option>
                <s-option value="NY">NY</s-option>
                <s-option value="CA">CA</s-option>
              </s-select>
              
              <s-text-field label="Postal code" autocomplete="postal-code"></s-text-field>
            </s-grid>
            
            <s-grid gridtemplatecolumns="auto 1fr" gap="small">
              <s-select label="Country">
                <s-option value="US">🇺🇸</s-option>
                <s-option value="CA">🇨🇦</s-option>
                <s-option value="MX">🇲🇽</s-option>
              </s-select>
              <s-text-field label="Phone number"></s-text-field>
            </s-grid>
          </s-section>
          
          <s-section heading="Hello world"></s-section>
          
          <s-section>
            <s-heading>Hello world</s-heading>
            <s-heading>Hello world</s-heading>
            <s-heading>Hello world</s-heading>
            <s-heading>Hello world</s-heading>
          </s-section>
          
          <s-section heading="Level 1">
            <s-paragraph>Paragraph content</s-paragraph>
            <s-section heading="Level 2">
              <s-paragraph>Paragraph content</s-paragraph>
              <s-section heading="Level 3">
                <s-paragraph>Paragraph content</s-paragraph>
                <s-section heading="Level 4">
                  <s-paragraph>Paragraph content</s-paragraph>
                  <s-section heading="Level 5">
                    <s-paragraph>Paragraph content</s-paragraph>
                    <s-section heading="Level 6">
                      <s-paragraph>Paragraph content</s-paragraph>
                    </s-section>
                  </s-section>
                </s-section>
              </s-section>
            </s-section>
          </s-section>
        </div>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
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
          
          <s-section accessibilitylabel="Heading in slot">
            <s-heading>Customer</s-heading>
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
          
          <s-section accessibilitylabel="No L1 heading">
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
      </div>
    </s-page>
  );
}