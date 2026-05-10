/**
 * MCJA Viewer Component - Displays complete MCJA documentation table
 * Automatically reads from widgetRegistry to show all widgets, commands, jobs, and actions
 */

import React, { useState, useMemo } from 'react';
import { generateMCJARows, getAllWidgets, getWidgetsByCategory } from '../../data/widgetRegistry';
import type { WidgetMCJAMetadata } from '../../types/mcja';
import './MCJAViewer.css';

type CategoryFilter = 'All' | 'Data' | 'Visualize' | 'Model' | 'Evaluate' | 'Unsupervised';

export const MCJAViewer: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'widgets'>('table');

  // Generate MCJA rows from registry
  const allRows = useMemo(() => generateMCJARows(), []);
  const allWidgets = useMemo(() => getAllWidgets(), []);

  // Filter by category
  const filteredRows = useMemo(() => {
    let rows = allRows;
    if (categoryFilter !== 'All') {
      rows = rows.filter(row => row.category === categoryFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      rows = rows.filter(
        row =>
          row.widgetName.toLowerCase().includes(term) ||
          row.commandName.toLowerCase().includes(term) ||
          row.jobDescription.toLowerCase().includes(term) ||
          row.actionOutput.toLowerCase().includes(term)
      );
    }
    return rows;
  }, [allRows, categoryFilter, searchTerm]);

  const filteredWidgets = useMemo(() => {
    let widgets = allWidgets;
    if (categoryFilter !== 'All') {
      widgets = getWidgetsByCategory(categoryFilter as any);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      widgets = widgets.filter(
        w =>
          w.menu.toLowerCase().includes(term) ||
          w.description.toLowerCase().includes(term)
      );
    }
    return widgets;
  }, [allWidgets, categoryFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const widgets = new Set(filteredRows.map(r => r.widgetName)).size;
    const commands = filteredRows.length;
    const categories = new Set(filteredRows.map(r => r.category)).size;
    return { widgets, commands, categories };
  }, [filteredRows]);

  const categories: CategoryFilter[] = ['All', 'Data', 'Visualize', 'Model', 'Evaluate', 'Unsupervised'];

  return (
    <div className="mcja-viewer">
      <div className="mcja-header">
        <h1><span className="flex items-center gap-2"><DocumentIcon className="w-6 h-6" /> MCJA Documentation</span></h1>
        <p className="mcja-subtitle">
          Menu/Widget, Command/Control, Job/Function, Action/Output - Complete Auto-Generated Documentation
        </p>
      </div>

      {/* Controls */}
      <div className="mcja-controls">
        <div className="mcja-filters">
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
            className="mcja-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mcja-search">
          <input
            type="text"
            placeholder="Search widgets, commands, jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mcja-input"
          />
        </div>

        <div className="mcja-view-toggle">
          <button
            className={viewMode === 'table' ? 'active' : ''}
            onClick={() => setViewMode('table')}
          >
            TableIcon Table View
          </button>
          <button
            className={viewMode === 'widgets' ? 'active' : ''}
            onClick={() => setViewMode('widgets')}
          >
            <span className="flex items-center gap-2"><GridIcon className="w-5 h-5" /> Widgets View</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mcja-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.widgets}</span>
          <span className="stat-label">Widgets</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.commands}</span>
          <span className="stat-label">Commands</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.categories}</span>
          <span className="stat-label">Categories</span>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <div className="mcja-table-container">
          <table className="mcja-table">
            <thead>
              <tr>
                <th>Menu / Widget</th>
                <th>Category</th>
                <th>Command / Control</th>
                <th>Type</th>
                <th>Job / Function</th>
                <th>Action / Output</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, idx) => (
                <tr key={`${row.widgetName}-${row.commandName}-${idx}`}>
                  <td className="widget-name">{row.widgetName}</td>
                  <td>
                    <span className={`category-badge cat-${row.category.toLowerCase()}`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="command-name">{row.commandName}</td>
                  <td>
                    <span className="command-type">{row.commandType}</span>
                  </td>
                  <td className="job-desc">{row.jobDescription}</td>
                  <td className="action-output">{row.actionOutput}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRows.length === 0 && (
            <div className="no-results">
              No MCJA entries found matching your filters.
            </div>
          )}
        </div>
      ) : (
        <div className="mcja-widgets-grid">
          {filteredWidgets.map(widget => (
            <div key={widget.type} className="widget-card">
              <div className="widget-header">
                <span className="widget-icon">{widget.icon}</span>
                <div>
                  <h3>{widget.menu}</h3>
                  <span className={`category-badge cat-${widget.category.toLowerCase()}`}>
                    {widget.category}
                  </span>
                </div>
              </div>
              <p className="widget-description">{widget.description}</p>
              
              <div className="widget-io">
                {widget.inputs.length > 0 && (
                  <div className="io-section">
                    <strong>Inputs:</strong>
                    <ul>
                      {widget.inputs.map(inp => (
                        <li key={inp.id}>{inp.name} ({inp.type})</li>
                      ))}
                    </ul>
                  </div>
                )}
                {widget.outputs.length > 0 && (
                  <div className="io-section">
                    <strong>Outputs:</strong>
                    <ul>
                      {widget.outputs.map(out => (
                        <li key={out.id}>{out.name} ({out.type})</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="widget-commands">
                <h4>Commands ({widget.commands.length})</h4>
                <div className="commands-list">
                  {widget.commands.map(cmd => (
                    <div key={cmd.id} className="command-item">
                      <div className="command-header">
                        <span className="command-name-small">{cmd.name}</span>
                        <span className="command-type-small">{cmd.type}</span>
                      </div>
                      <p className="command-job"><strong>Job:</strong> {cmd.job}</p>
                      <p className="command-action"><strong>Action:</strong> {cmd.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mcja-footer">
        <p>
          Total: {stats.widgets} widgets with {stats.commands} commands documented.
          This documentation is auto-generated from the widget registry.
        </p>
      </div>
    </div>
  );
};
