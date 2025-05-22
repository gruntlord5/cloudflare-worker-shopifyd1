import { useEffect, useState, useMemo } from "react";

export default function WebComponentsTest() {
  const [showBanner, setShowBanner] = useState(false);
  const [toastChecked, setToastChecked] = useState(false);
  const [submittedNames, setSubmittedNames] = useState([]);
  const [nameInputValue, setNameInputValue] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [componentStatusData, setComponentStatusData] = useState([
    { id: 'banner', name: 'Banner Notification', status: 'Inactive', time: new Date().toLocaleTimeString() },
    { id: 'toast', name: 'Toast Notification', status: 'Inactive', time: new Date().toLocaleTimeString() },
    { id: 'modal', name: 'Name Form Modal', status: 'Inactive', time: new Date().toLocaleTimeString() }
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle spinner button click
  const handleSpinnerClick = () => {
    setShowSpinner(true);
    setButtonLoading(true);
    
    setTimeout(() => {
      setShowSpinner(false);
      setButtonLoading(false);
    }, 3000);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort the component status data
  const sortedComponentStatusData = useMemo(() => {
    if (!sortConfig.key) return componentStatusData;
    
    return [...componentStatusData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [componentStatusData, sortConfig]);

  // Handle checkbox change to toggle banner visibility
  useEffect(() => {
    const handleCheckboxChange = (event) => {
      const isChecked = event.target.checked;
      setShowBanner(isChecked);
      
      // Update component status data
      updateComponentStatus('banner', isChecked ? 'Active' : 'Inactive');
    };

    const checkbox = document.querySelector('s-checkbox[data-type="banner"]');
    if (checkbox) {
      checkbox.addEventListener('change', handleCheckboxChange);
    }

    return () => {
      if (checkbox) {
        checkbox.removeEventListener('change', handleCheckboxChange);
      }
    };
  }, []);

  // Handle banner dismissal
  useEffect(() => {
    const handleBannerDismiss = () => {
      setShowBanner(false);
      
      const checkbox = document.querySelector('s-checkbox[data-type="banner"]');
      if (checkbox) {
        checkbox.checked = false;
      }
      
      updateComponentStatus('banner', 'Inactive');
    };

    const banner = document.querySelector('s-banner');
    if (banner) {
      banner.addEventListener('dismiss', handleBannerDismiss);
    }

    return () => {
      if (banner) {
        banner.removeEventListener('dismiss', handleBannerDismiss);
      }
    };
  }, [showBanner]);
  
  // Handle toast checkbox change
  useEffect(() => {
    const handleToastCheckboxChange = (event) => {
      const isChecked = event.target.checked;
      setToastChecked(isChecked);
      
      updateComponentStatus('toast', isChecked ? 'Active' : 'Inactive');
      
      if (isChecked) {
        window.shopify?.toast?.show('Action completed successfully!', {
          duration: 4000,
        });
        
        setTimeout(() => {
          const checkbox = document.querySelector('s-checkbox[data-type="toast"]');
          if (checkbox) {
            checkbox.checked = false;
            setToastChecked(false);
            updateComponentStatus('toast', 'Inactive');
          }
        }, 4000);
      }
    };

    const toastCheckbox = document.querySelector('s-checkbox[data-type="toast"]');
    if (toastCheckbox) {
      toastCheckbox.addEventListener('change', handleToastCheckboxChange);
    }

    return () => {
      if (toastCheckbox) {
        toastCheckbox.removeEventListener('change', handleToastCheckboxChange);
      }
    };
  }, []);

  // Handle modal interactions
  useEffect(() => {
    const updateModalStatus = (isActive) => {
      updateComponentStatus('modal', isActive ? 'Active' : 'Inactive');
    };

    const modal = document.getElementById('simple-form-modal');
    
    if (modal) {
      modal.addEventListener('show', () => updateModalStatus(true));
      modal.addEventListener('hide', () => updateModalStatus(false));
    }

    const modalButton = document.querySelector('s-button[data-action="open-modal"]');
    if (modalButton) {
      modalButton.addEventListener('click', () => {
        if (modal) modal.show();
      });
    }

    return () => {
      if (modal) {
        modal.removeEventListener('show', () => updateModalStatus(true));
        modal.removeEventListener('hide', () => updateModalStatus(false));
      }
      if (modalButton) {
        modalButton.removeEventListener('click', () => {});
      }
    };
  }, []);

  // Function to update component status data
  const updateComponentStatus = (id, status) => {
    setComponentStatusData(prevData => 
      prevData.map(item => 
        item.id === id 
          ? { ...item, status, time: new Date().toLocaleTimeString() }
          : item
      )
    );
  };

  // Function to add a submitted name to component status
  const addSubmittedNameToComponentStatus = (name, time) => {
    const newEntry = {
      id: `submitted-${Date.now()}`,
      name: `Submitted Name: ${name}`,
      status: 'Submitted',
      time
    };
    setComponentStatusData(prevData => [...prevData, newEntry]);
  };
  
  // Handle name input change
  const handleNameChange = (e) => {
    setNameInputValue(e.currentTarget.value);
  };
  
  // Handle save button click
  const handleSave = () => {
    if (nameInputValue && nameInputValue.trim() !== '') {
      const newName = nameInputValue.trim();
      const currentTime = new Date().toLocaleTimeString();
      
      setSubmittedNames(prevNames => [...prevNames, {
        name: newName,
        time: currentTime
      }]);
      
      addSubmittedNameToComponentStatus(newName, currentTime);
      
      setNameInputValue('');
      
      const modal = document.getElementById('simple-form-modal');
      if (modal) modal.hide();
    } else {
      window.shopify?.toast?.show('Please enter a name before saving', {
        duration: 2000,
        tone: 'critical'
      });
    }
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    setNameInputValue('');
    
    const modal = document.getElementById('simple-form-modal');
    if (modal) modal.hide();
  };

  // Helper function to get sort icon
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <s-icon type="select" size="small" color="subdued"></s-icon>;
    }
    return sortConfig.direction === 'asc' 
      ? <s-icon type="arrow-up" size="small"></s-icon>
      : <s-icon type="arrow-down" size="small"></s-icon>;
  };

  return (
    <s-page inlineSize="large">
      {showBanner && (
        <s-banner heading="Important notification" tone="info" dismissible>
          This notification appears when the banner checkbox is checked.
        </s-banner>
      )}
      
      <s-section>
        <s-heading>
          Polaris Web Components Test
        </s-heading>
        <s-link href="https://shopify.dev/docs/api/app-home/polaris-web-components" target="_blank">
          Click Here to open a link in a new tab!
        </s-link>
        {' '}
        <s-link href="/app/" target="_self" tone="critical">
          Click Here to open a link in this tab!
        </s-link>
        {' '}
        <s-button 
          variant="secondary" 
          loading={buttonLoading}
          onClick={handleSpinnerClick}
        >
          Click here to see a spinner
        </s-button>
        {showSpinner && (
          <>
            {' '}
            <s-spinner accessibilityLabel="Loading" size="base"></s-spinner>
          </>
        )}
      </s-section>
      
      <s-grid 
        gridTemplateColumns="@container (inline-size < 768px) 1fr, 2fr 1fr" 
        gap="base"
      >
        {/* Left column - Interactive components */}
        <s-grid-item>
          <s-stack gap="base">
            <s-section heading="Banner Notifications">
              <s-paragraph>Check the box below to show a banner notification at the top of the page.</s-paragraph>
              <s-card>
                <s-checkbox
                  data-type="banner"
                  label="Show banner notification"
                  details="Displays a dismissible banner at the top of the page"
                ></s-checkbox>
              </s-card>
            </s-section>
            
            <s-section heading="Toast Notifications">
              <s-paragraph>Check the box below to trigger a toast notification at the bottom of the screen.</s-paragraph>
              <s-card>
                <s-checkbox
                  data-type="toast"
                  label="Show toast notification"
                  details="Displays a temporary toast message"
                ></s-checkbox>
              </s-card>
            </s-section>
            
            <s-section heading="Modal Form">
              <s-paragraph>Click the button below to open a simple modal with a name input field.</s-paragraph>
              <s-card>
                <s-button 
                  variant="primary" 
                  data-action="open-modal"
                >
                  Open Modal
                </s-button>
                
                <ui-modal id="simple-form-modal" variant="small">
                  <s-box padding="base">
                    <s-stack gap="base">
                      <s-form id="name-form">
                        <s-text-field 
                          label="Name" 
                          name="submitted-name" 
                          placeholder="Enter your name" 
                          autocomplete="name"
                          required
                          value={nameInputValue}
                          onInput={handleNameChange}
                          onChange={handleNameChange}
                        ></s-text-field>
                      </s-form>
                    </s-stack>
                  </s-box>
                  <ui-title-bar title="Enter Name">
                    <button 
                      variant="primary" 
                      data-action="save-name"
                      onClick={handleSave}
                    >Save</button>
                    <button 
                      onClick={handleCancel}
                    >Cancel</button>
                  </ui-title-bar>
                </ui-modal>
              </s-card>
            </s-section>
            
            <s-section heading="Submitted Names">
              <s-paragraph>Names submitted through the modal form will appear in this table.</s-paragraph>
              <s-card>
                {submittedNames.length === 0 ? (
                  <s-text tone="subdued">No names submitted yet.</s-text>
                ) : (
                  <s-table>
                    <s-table-header-row>
                      <s-table-header>Name</s-table-header>
                      <s-table-header>Submitted At</s-table-header>
                    </s-table-header-row>
                    <s-table-body>
                      {submittedNames.map((item, index) => (
                        <s-table-row key={index}>
                          <s-table-cell>{item.name}</s-table-cell>
                          <s-table-cell>{item.time}</s-table-cell>
                        </s-table-row>
                      ))}
                    </s-table-body>
                  </s-table>
                )}
              </s-card>
            </s-section>
          </s-stack>
        </s-grid-item>
        
        {/* Right column - Component Status */}
        <s-grid-item>
          <s-section heading="Component Status">
            <s-paragraph>This table shows the current state of each component. Click column headers to sort.</s-paragraph>
            <s-card padding="base">
              <s-table>
                <s-table-header-row>
                  <s-table-header>
                    <s-clickable onClick={() => handleSort('name')}>
                      <s-stack direction="inline" gap="small" alignItems="center">
                        Component
                        {getSortIcon('name')}
                      </s-stack>
                    </s-clickable>
                  </s-table-header>
                  <s-table-header>
                    <s-clickable onClick={() => handleSort('status')}>
                      <s-stack direction="inline" gap="small" alignItems="center">
                        Status
                        {getSortIcon('status')}
                      </s-stack>
                    </s-clickable>
                  </s-table-header>
                  <s-table-header>
                    <s-clickable onClick={() => handleSort('time')}>
                      <s-stack direction="inline" gap="small" alignItems="center">
                        Last Updated
                        {getSortIcon('time')}
                      </s-stack>
                    </s-clickable>
                  </s-table-header>
                </s-table-header-row>
                <s-table-body>
                  {sortedComponentStatusData.map((item) => (
                    <s-table-row key={item.id}>
                      <s-table-cell>{item.name}</s-table-cell>
                      <s-table-cell>
                        <s-badge tone={
                          item.status === 'Active' ? 'success' : 
                          item.status === 'Submitted' ? 'success' : 
                          'neutral'
                        }>
                          {item.status}
                        </s-badge>
                      </s-table-cell>
                      <s-table-cell>{item.time}</s-table-cell>
                    </s-table-row>
                  ))}
                </s-table-body>
              </s-table>
            </s-card>
          </s-section>
        </s-grid-item>
      </s-grid>
    </s-page>
  );
}