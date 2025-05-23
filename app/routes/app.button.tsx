import React, { useState } from "react";

export default function ButtonShowcase() {
  const [loadingStates, setLoadingStates] = useState({});

  const headingStyle = {
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    margin: "0px",
    lineHeight: "12px",
    fontSize: "12px",
    letterSpacing: "0px",
    fontWeight: "600",
    color: "rebeccapurple"
  };

  const flexContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap"
  };

  const toggleLoading = (idSuffix) => {
    setLoadingStates(prev => ({
      ...prev,
      [idSuffix]: !prev[idSuffix]
    }));
  };

  const isLoading = (idSuffix) => {
    // Start with loading enabled by default (undefined = true), allow toggling
    return loadingStates[idSuffix] !== true;
  };

  const ButtonSet = ({ tone, variant }) => {
    const idSuffix = `${tone}-${variant}`;
    
    return (
      <>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`text-${idSuffix}`}>With text</s-button>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`text-icon-${idSuffix}`} icon="plus-circle">With text and Icon</s-button>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`icon-${idSuffix}`} icon="plus-circle" accessibilitylabel="Add resource"></s-button>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`link-${idSuffix}`} href="#is-link" target="_self">Link Button</s-button>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`disabled-${idSuffix}`} disabled>Disabled with text</s-button>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`disabled-text-icon-${idSuffix}`} disabled icon="plus-circle">With text and Icon</s-button>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`disabled-icon-${idSuffix}`} disabled icon="plus-circle" accessibilitylabel="Add resource"></s-button>
        <s-button idsuffix={idSuffix} tone={tone} variant={variant} id={`disabled-link-${idSuffix}`} disabled href="#" target="_blank">As link</s-button>
        <s-button 
          idsuffix={idSuffix} 
          tone={tone} 
          variant={variant} 
          id={`loading-${idSuffix}`} 
          loading={isLoading(idSuffix)}
        >
          With text
        </s-button>
        <s-button 
          idsuffix={idSuffix} 
          tone={tone} 
          variant={variant} 
          id={`loading-text-icon-${idSuffix}`} 
          icon="plus-circle" 
          loading={isLoading(idSuffix)}
        >
          With text and Icon
        </s-button>
        <s-button 
          idsuffix={idSuffix} 
          tone={tone} 
          variant={variant} 
          id={`loading-icon-${idSuffix}`} 
          icon="plus-circle" 
          accessibilitylabel="Add resource" 
          loading={isLoading(idSuffix)}
        ></s-button>
        <s-button 
          idsuffix={idSuffix} 
          tone={tone} 
          variant={variant} 
          id={`loading-link-${idSuffix}`} 
          href="#" 
          target="_blank" 
          loading={isLoading(idSuffix)}
        >
          As link
        </s-button>
        <s-button 
          idsuffix={idSuffix} 
          tone={tone} 
          variant={variant} 
          id={`loading-onclick-${idSuffix}`} 
          icon={isLoading(idSuffix) ? "toggle-on" : "toggle-off"}
          accessibilitylabel="Toggle loading"
          onClick={() => toggleLoading(idSuffix)}
        ></s-button>
      </>
    );
  };

  return (
    <div id="admin-ui-storybook-ready" style={{ writingMode: "horizontal-tb" }}>
      <div className="layout">
        <h2 style={headingStyle}>Default</h2>
        <s-button>Hello</s-button>

        <h2 style={headingStyle}>primary neutral</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="neutral" variant="primary" />
        </div>

        <h2 style={headingStyle}>secondary neutral</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="neutral" variant="secondary" />
        </div>

        <h2 style={headingStyle}>tertiary neutral</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="neutral" variant="tertiary" />
        </div>

        <h2 style={headingStyle}>auto neutral</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="neutral" variant="auto" />
        </div>

        <h2 style={headingStyle}>primary critical</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="critical" variant="primary" />
        </div>

        <h2 style={headingStyle}>secondary critical</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="critical" variant="secondary" />
        </div>

        <h2 style={headingStyle}>tertiary critical</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="critical" variant="tertiary" />
        </div>

        <h2 style={headingStyle}>auto critical</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="critical" variant="auto" />
        </div>

        <h2 style={headingStyle}>primary auto</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="auto" variant="primary" />
        </div>

        <h2 style={headingStyle}>secondary auto</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="auto" variant="secondary" />
        </div>

        <h2 style={headingStyle}>tertiary auto</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="auto" variant="tertiary" />
        </div>

        <h2 style={headingStyle}>auto auto</h2>
        <div style={flexContainerStyle}>
          <ButtonSet tone="auto" variant="auto" />
        </div>

        <h2 style={headingStyle}>Button vertical allignment</h2>
        <div>
          <s-button icon="adjust">Icon btn without flex parent</s-button>
          <s-button>Regular btn without flex parent</s-button>
        </div>
        <div style={flexContainerStyle}>
          <s-button icon="adjust">Icon btn in flex parent</s-button>
          <s-button>Regular btn in flex parent</s-button>
        </div>
      </div>
    </div>
  );
}