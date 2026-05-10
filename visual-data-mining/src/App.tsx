/**
 * Main App Component - Visual Data Mining Application with MCJA Auto-Documentation
 */

import React, { useState, useCallback } from 'react';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { WidgetCatalog } from './components/widgets/WidgetCatalog';
import { MCJAViewer } from './components/mcja/MCJAViewer';
import { BeakerIcon, GridIcon, DocumentIcon, SettingsIcon } from './components/icons';
import './App.css';

type ActiveView = 'canvas' | 'mcja';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('canvas');
  const [addWidgetHandler, setAddWidgetHandler] = useState<((widgetType: string) => void) | null>(null);

  const handleAddWidgetFromCatalog = useCallback((handler: (widgetType: string) => void) => {
    setAddWidgetHandler(() => handler);
  }, []);

  const handleWidgetClick = useCallback((widgetType: string) => {
    if (addWidgetHandler) {
      addWidgetHandler(widgetType);
    }
  }, [addWidgetHandler]);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-logo">
          <span className="logo-icon"><BeakerIcon className="w-8 h-8" /></span>
          <h1>Visual Data Mining</h1>
        </div>
        <nav className="header-nav">
          <button
            className={`nav-btn ${activeView === 'canvas' ? 'active' : ''}`}
            onClick={() => setActiveView('canvas')}
          >
            <span className="flex items-center gap-2"><GridIcon className="w-5 h-5" /> Workflow Canvas</span>
          </button>
          <button
            className={`nav-btn ${activeView === 'mcja' ? 'active' : ''}`}
            onClick={() => setActiveView('mcja')}
          >
            <span className="flex items-center gap-2"><DocumentIcon className="w-5 h-5" /> MCJA Documentation</span>
          </button>
        </nav>
        <div className="header-info">
          <span>Inspired by Orange Data Mining</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {activeView === 'canvas' ? (
          <div className="canvas-layout">
            {/* Left Sidebar - Widget Catalog */}
            <WidgetCatalog onAddWidget={handleWidgetClick} />
            
            {/* Center - Workflow Canvas */}
            <WorkflowCanvas onAddWidgetFromCatalog={handleAddWidgetFromCatalog} />
            
            {/* Right Panel - Placeholder for widget properties */}
            <aside className="properties-panel">
              <div className="panel-header">
                <h3><span className="flex items-center gap-2"><SettingsIcon className="w-5 h-5" /> Properties</span></h3>
              </div>
              <div className="panel-content">
                <p className="empty-state">
                  Select a widget on the canvas to view and edit its properties.
                </p>
                <div className="quick-tips">
                  <h4>Quick Tips:</h4>
                  <ul>
                    <li>Add widgets from the catalog to the canvas</li>
                    <li>Connect outputs to inputs to build workflows</li>
                    <li>Click on widgets to configure settings</li>
                    <li>View MCJA docs for complete widget reference</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <MCJAViewer />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Visual Data Mining Platform with Auto-Generated MCJA Documentation | 
          {activeView === 'canvas' ? 'Build your data analysis workflow' : 'Complete widget documentation'}
        </p>
      </footer>
    </div>
  );
}

export default App;
