import React, { useState, useEffect } from "react";

export default function TableShowcase() {
  const [isLoading, setIsLoading] = useState(true);

  const headingStyle = {
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    margin: "0px",
    lineHeight: "12px",
    fontSize: "12px",
    letterSpacing: "0px",
    fontWeight: "600",
    color: "rebeccapurple"
  };

  // Keep the loading table always loading
  useEffect(() => {
    const loadingTable = document.querySelector('[data-loading="true"]');
    if (loadingTable) {
      loadingTable.loading = true;
    }
  }, []);

  return (
    <div id="admin-ui-storybook-ready" style={{ writingMode: "horizontal-tb" }}>
      <div className="layout">
        <s-page inlinesize="large">
          <h2 style={headingStyle}>Default</h2>
          
          <div style={{ marginBottom: "1rem" }}>
            <s-table paginate hasnextpage>
              <s-table-header-row>
                <s-table-header listslot="primary">Name</s-table-header>
                <s-table-header listslot="secondary">Emotion</s-table-header>
                <s-table-header listslot="kicker">Date</s-table-header>
                <s-table-header>Likes Cats</s-table-header>
                <s-table-header>Other lang</s-table-header>
              </s-table-header-row>
              <s-table-body>
                <s-table-row>
                  <s-table-cell>Bob</s-table-cell>
                  <s-table-cell>Happy</s-table-cell>
                  <s-table-cell>Today</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Alice</s-table-cell>
                  <s-table-cell>Sad</s-table-cell>
                  <s-table-cell>Yesterday</s-table-cell>
                  <s-table-cell>No</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Charlie</s-table-cell>
                  <s-table-cell>Angry</s-table-cell>
                  <s-table-cell>Tomorrow</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
              </s-table-body>
            </s-table>
          </div>
          
          <s-section accessibilitylabel="Default" padding="none">
            <s-table paginate hasnextpage>
              <s-table-header-row>
                <s-table-header listslot="primary">Name</s-table-header>
                <s-table-header listslot="secondary">Emotion</s-table-header>
                <s-table-header listslot="kicker">Date</s-table-header>
                <s-table-header>Likes Cats</s-table-header>
                <s-table-header>Other lang</s-table-header>
              </s-table-header-row>
              <s-table-body>
                <s-table-row>
                  <s-table-cell>Bob</s-table-cell>
                  <s-table-cell>Happy</s-table-cell>
                  <s-table-cell>Today</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Alice</s-table-cell>
                  <s-table-cell>Sad</s-table-cell>
                  <s-table-cell>Yesterday</s-table-cell>
                  <s-table-cell>No</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Charlie</s-table-cell>
                  <s-table-cell>Angry</s-table-cell>
                  <s-table-cell>Tomorrow</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
              </s-table-body>
            </s-table>
          </s-section>

          <h2 style={headingStyle}>Loading</h2>
          
          <s-section accessibilitylabel="Loading" padding="none">
            <s-table 
              loading={isLoading} 
              paginate 
              hasnextpage
              data-loading="true"
            >
              <s-table-header-row>
                <s-table-header listslot="primary">Name</s-table-header>
                <s-table-header listslot="secondary">Emotion</s-table-header>
                <s-table-header listslot="kicker">Date</s-table-header>
                <s-table-header>Likes Cats</s-table-header>
                <s-table-header>Other lang</s-table-header>
              </s-table-header-row>
              <s-table-body>
                <s-table-row>
                  <s-table-cell>Bob</s-table-cell>
                  <s-table-cell>Happy</s-table-cell>
                  <s-table-cell>Today</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Alice</s-table-cell>
                  <s-table-cell>Sad</s-table-cell>
                  <s-table-cell>Yesterday</s-table-cell>
                  <s-table-cell>No</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Charlie</s-table-cell>
                  <s-table-cell>Angry</s-table-cell>
                  <s-table-cell>Tomorrow</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
              </s-table-body>
            </s-table>
          </s-section>

          <h2 style={headingStyle}>Search</h2>
          
          <s-section accessibilitylabel="Search" padding="none">
            <s-table>
              <s-table-header-row>
                <s-table-header listslot="primary">Name</s-table-header>
                <s-table-header listslot="secondary">Emotion</s-table-header>
                <s-table-header listslot="kicker">Date</s-table-header>
                <s-table-header>Likes Cats</s-table-header>
                <s-table-header>Other lang</s-table-header>
              </s-table-header-row>
              <s-table-body>
                <s-table-row>
                  <s-table-cell>Bob</s-table-cell>
                  <s-table-cell>Happy</s-table-cell>
                  <s-table-cell>Today</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Alice</s-table-cell>
                  <s-table-cell>Sad</s-table-cell>
                  <s-table-cell>Yesterday</s-table-cell>
                  <s-table-cell>No</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Charlie</s-table-cell>
                  <s-table-cell>Angry</s-table-cell>
                  <s-table-cell>Tomorrow</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Diana</s-table-cell>
                  <s-table-cell>Happy</s-table-cell>
                  <s-table-cell>Next Week</s-table-cell>
                  <s-table-cell>Yes</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
                <s-table-row>
                  <s-table-cell>Evan</s-table-cell>
                  <s-table-cell>Sad</s-table-cell>
                  <s-table-cell>Last Month</s-table-cell>
                  <s-table-cell>No</s-table-cell>
                  <s-table-cell>Out of stock</s-table-cell>
                </s-table-row>
              </s-table-body>
              <div slot="filters" style={{ display: "contents" }}>
                <s-search-field 
                  label="Search for a name" 
                  labelaccessibilityvisibility="exclusive"
                ></s-search-field>
              </div>
            </s-table>
          </s-section>
        </s-page>
      </div>
    </div>
  );
}