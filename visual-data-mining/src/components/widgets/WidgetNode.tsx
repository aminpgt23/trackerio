/**
 * WidgetNode - Custom ReactFlow node component for data mining widgets
 */

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { getWidgetByType, getIconByName } from '../../data/widgetRegistry';
import './WidgetNode.css';

export interface WidgetNodeData {
  label: string;
  widgetType: string;
  icon?: string;
  category?: string;
  status?: 'idle' | 'running' | 'completed' | 'error';
}

const WidgetNode: React.FC<NodeProps<WidgetNodeData>> = ({ data, selected }) => {
  const widgetMeta = getWidgetByType(data.widgetType);
  const IconComponent = getIconByName(data.icon || widgetMeta?.icon);
  
  return (
    <div className={`widget-node ${selected ? 'selected' : ''} ${data.status || ''}`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="widget-handle input"
        id="input"
      />
      
      {/* Node Header */}
      <div className="widget-header">
        <span className="widget-icon">
          {IconComponent ? <IconComponent className="w-6 h-6" /> : (data.icon || '📦')}
        </span>
        <div className="widget-title">
          <span className="widget-name">{data.label}</span>
          {widgetMeta && (
            <span className={`widget-category cat-${widgetMeta.category.toLowerCase()}`}>
              {widgetMeta.category}
            </span>
          )}
        </div>
      </div>
      
      {/* Node Body */}
      <div className="widget-body">
        {widgetMeta && (
          <div className="widget-info">
            <div className="io-ports">
              <div className="port-section">
                <span className="port-label">In:</span>
                <span className="port-count">{widgetMeta.inputs.length}</span>
              </div>
              <div className="port-section">
                <span className="port-label">Out:</span>
                <span className="port-count">{widgetMeta.outputs.length}</span>
              </div>
              <div className="port-section">
                <span className="port-label">Cmd:</span>
                <span className="port-count">{widgetMeta.commands.length}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Status Indicator */}
        <div className="status-indicator">
          {data.status === 'running' && <span className="status-dot running"></span>}
          {data.status === 'completed' && <span className="status-dot completed">✓</span>}
          {data.status === 'error' && <span className="status-dot error">✗</span>}
        </div>
      </div>
      
      {/* Output Handles for each output port */}
      {widgetMeta?.outputs.map((output, idx) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          className="widget-handle output"
          id={`output-${output.id}`}
          style={{ 
            top: `${30 + idx * 25}px`,
            right: '-10px'
          }}
        />
      ))}
    </div>
  );
};

export default memo(WidgetNode);
