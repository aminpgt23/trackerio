/**
 * PropertiesPanel - Panel untuk konfigurasi widget, upload file, lihat data, dan hasil
 * Terinspirasi dari Orange Data Mining
 */

import React, { useState, useCallback } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { getWidgetByType } from '../../data/widgetRegistry';
import './PropertiesPanel.css';

export const PropertiesPanel: React.FC = () => {
  const { selectedNode, nodes, updateNode, updateNodeConfig, setNodeFileData, executeNode, removeNode } = useWorkflowStore();
  const [activeTab, setActiveTab] = useState<'settings' | 'data' | 'results'>('settings');

  const selectedNodeData = nodes.find(n => n.id === selectedNode)?.data;
  const widgetMeta = selectedNodeData ? getWidgetByType(selectedNodeData.widgetType) : null;

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedNode) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      
      // Parse CSV/JSON data
      let data: any[] = [];
      let columns: string[] = [];
      
      if (file.name.endsWith('.csv')) {
        const lines = content.split('\n');
        if (lines.length > 0) {
          columns = lines[0].split(',').map((col: string) => col.trim().replace(/"/g, ''));
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === columns.length) {
              const row: any = {};
              columns.forEach((col: string, idx: number) => {
                row[col] = values[idx]?.trim().replace(/"/g, '');
              });
              data.push(row);
            }
          }
        }
      } else if (file.name.endsWith('.json')) {
        try {
          data = JSON.parse(content);
          if (data.length > 0) {
            columns = Object.keys(data[0]);
          }
        } catch (err) {
          console.error('Failed to parse JSON:', err);
        }
      }

      // Update node with file data
      setNodeFileData(selectedNode, data, file.name, columns);
      updateNode(selectedNode, { 
        status: 'completed',
        fileName: file.name,
        rowCount: data.length 
      });
    };
    
    reader.readAsText(file);
  }, [selectedNode, setNodeFileData, updateNode]);

  const handleConfigChange = useCallback((configKey: string, value: any) => {
    if (selectedNode) {
      updateNodeConfig(selectedNode, configKey, value);
    }
  }, [selectedNode, updateNodeConfig]);

  const handleExecute = useCallback(async () => {
    if (selectedNode) {
      await executeNode(selectedNode);
    }
  }, [selectedNode, executeNode]);

  const handleDeleteNode = useCallback(() => {
    if (selectedNode) {
      removeNode(selectedNode);
    }
  }, [selectedNode, removeNode]);

  if (!selectedNode || !selectedNodeData) {
    return (
      <aside className="properties-panel">
        <div className="panel-header">
          <h3>Properties</h3>
        </div>
        <div className="panel-content">
          <div className="empty-state">
            <p>Select a widget on the canvas to view and edit its properties.</p>
            <div className="quick-tips">
              <h4>Quick Tips:</h4>
              <ul>
                <li>Add widgets from the catalog to the canvas</li>
                <li>Connect outputs to inputs to build workflows</li>
                <li>Double-click widget to configure settings</li>
                <li>Upload CSV/JSON files in File Reader widget</li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="properties-panel">
      <div className="panel-header">
        <h3>{selectedNodeData.label}</h3>
        <div className="header-actions">
          <button className="btn-execute" onClick={handleExecute} title="Execute Widget">
            ▶ Run
          </button>
          <button className="btn-delete" onClick={handleDeleteNode} title="Delete Widget">
            🗑
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="panel-tabs">
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button 
          className={`tab ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Data {selectedNodeData.rowCount !== undefined ? `(${selectedNodeData.rowCount})` : ''}
        </button>
        <button 
          className={`tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
      </div>

      <div className="panel-content">
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div className="widget-description">
              {widgetMeta?.description}
            </div>

            {/* File Upload for File Reader */}
            {selectedNodeData.widgetType === 'fileReader' && (
              <div className="file-upload-section">
                <label className="file-upload-label">
                  <input
                    type="file"
                    accept=".csv,.json,.xlsx,.xls"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <div className="file-upload-area">
                    <span className="upload-icon">📁</span>
                    <span>Click to upload file</span>
                    <span className="supported-formats">CSV, JSON, Excel</span>
                  </div>
                </label>
                {selectedNodeData.fileName && (
                  <div className="file-info">
                    <span className="file-name">📄 {selectedNodeData.fileName}</span>
                    <span className="file-rows">{selectedNodeData.rowCount} rows</span>
                  </div>
                )}
              </div>
            )}

            {/* Widget Commands/Controls */}
            {widgetMeta?.commands.map((cmd) => (
              <div key={cmd.id} className="control-group">
                <label className="control-label">{cmd.name}</label>
                <div className="control-description">{cmd.job}</div>
                
                {cmd.type === 'button' && (
                  <button className="control-button" onClick={handleExecute}>
                    {cmd.name}
                  </button>
                )}
                
                {cmd.type === 'input' && (
                  <input
                    type="text"
                    className="control-input"
                    defaultValue={cmd.defaultValue as string}
                    onChange={(e) => handleConfigChange(cmd.id, e.target.value)}
                  />
                )}
                
                {cmd.type === 'dropdown' && (
                  <select
                    className="control-select"
                    defaultValue={cmd.defaultValue as string}
                    onChange={(e) => handleConfigChange(cmd.id, e.target.value)}
                  >
                    <option value="">Select...</option>
                    {cmd.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                
                {cmd.type === 'slider' && (
                  <div className="control-slider">
                    <input
                      type="range"
                      min={cmd.min}
                      max={cmd.max}
                      step={cmd.step}
                      defaultValue={cmd.defaultValue as number}
                      onChange={(e) => handleConfigChange(cmd.id, parseFloat(e.target.value))}
                    />
                    <span className="slider-value">{cmd.defaultValue as number}</span>
                  </div>
                )}
                
                {cmd.type === 'checkbox' && (
                  <label className="control-checkbox">
                    <input
                      type="checkbox"
                      defaultChecked={cmd.defaultValue as boolean}
                      onChange={(e) => handleConfigChange(cmd.id, e.target.checked)}
                    />
                    <span>{cmd.name}</span>
                  </label>
                )}
              </div>
            ))}

            {/* Column Selection if data is loaded */}
            {selectedNodeData.columns && selectedNodeData.columns.length > 0 && (
              <div className="column-selection">
                <h4>Select Columns</h4>
                <div className="columns-list">
                  {selectedNodeData.columns.map(col => (
                    <label key={col} className="column-item">
                      <input type="checkbox" defaultChecked />
                      <span>{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Data Tab */}
        {activeTab === 'data' && (
          <div className="data-tab">
            {selectedNodeData.fileData || selectedNodeData.outputData ? (
              <>
                <div className="data-preview-header">
                  <span>Data Preview</span>
                  <button className="btn-export">Export CSV</button>
                </div>
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        {(selectedNodeData.columns || []).map(col => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedNodeData.fileData || selectedNodeData.outputData || [])
                        .slice(0, 20)
                        .map((row: any, idx: number) => (
                          <tr key={idx}>
                            {(selectedNodeData.columns || []).map(col => (
                              <td key={col}>{row[col]}</td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="data-footer">
                  Showing {Math.min(20, selectedNodeData.rowCount || 0)} of {selectedNodeData.rowCount || 0} rows
                </div>
              </>
            ) : (
              <div className="empty-data">
                <p>No data loaded yet.</p>
                {selectedNodeData.widgetType === 'fileReader' && (
                  <p>Upload a CSV or JSON file in the Settings tab.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="results-tab">
            {selectedNodeData.status === 'completed' ? (
              <>
                <div className="result-status success">
                  ✓ Execution completed successfully
                </div>
                
                {selectedNodeData.visualization && (
                  <div className="visualization-result">
                    <h4>Visualization</h4>
                    <div className="chart-placeholder">
                      Chart: {(selectedNodeData.visualization as any).type}
                      <br />
                      Data points: {((selectedNodeData.visualization as any).data || []).length}
                    </div>
                  </div>
                )}
                
                {selectedNodeData.metrics && (
                  <div className="metrics-result">
                    <h4>Metrics</h4>
                    <div className="metrics-grid">
                      {Object.entries(selectedNodeData.metrics).map(([key, value]) => (
                        <div key={key} className="metric-item">
                          <span className="metric-name">{key}</span>
                          <span className="metric-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedNodeData.predictions && (
                  <div className="predictions-result">
                    <h4>Predictions</h4>
                    <div className="predictions-list">
                      {selectedNodeData.predictions.slice(0, 10).map((pred: any, idx: number) => (
                        <div key={idx} className="prediction-item">
                          {JSON.stringify(pred)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : selectedNodeData.status === 'running' ? (
              <div className="result-status running">
                ⏳ Processing...
              </div>
            ) : selectedNodeData.status === 'error' ? (
              <div className="result-status error">
                ✗ Execution failed
              </div>
            ) : (
              <div className="empty-results">
                <p>Run the widget to see results.</p>
                <button className="btn-run" onClick={handleExecute}>
                  ▶ Run Widget
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
