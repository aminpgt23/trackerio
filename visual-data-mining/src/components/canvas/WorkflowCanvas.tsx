/**
 * WorkflowCanvas - Main ReactFlow canvas for building data mining workflows
 */

import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import WidgetNode, { WidgetNodeData } from '../../widgets/WidgetNode';
import { getWidgetByType } from '../../data/widgetRegistry';
import { useWorkflowStore } from '../../store/workflowStore';
import './WorkflowCanvas.css';

const nodeTypes: NodeTypes = {
  widget: WidgetNode,
};

interface WorkflowCanvasProps {
  onAddWidgetFromCatalog: (handler: (widgetType: string) => void) => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ onAddWidgetFromCatalog }) => {
  const { nodes, edges, addNode, addEdge: storeAddEdge, setSelectedNode } = useWorkflowStore();

  const onConnect = useCallback(
    (params: Connection) => {
      const edge: Edge = {
        ...params,
        id: uuidv4(),
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3498db', strokeWidth: 2 },
      };
      storeAddEdge(edge);
    },
    [storeAddEdge]
  );

  const handleAddWidget = useCallback((widgetType: string) => {
    const widgetMeta = getWidgetByType(widgetType);
    if (!widgetMeta) return;

    const newNode: Node<WidgetNodeData> = {
      id: uuidv4(),
      type: 'widget',
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: widgetMeta.menu,
        widgetType: widgetType,
        icon: widgetMeta.icon,
        category: widgetMeta.category,
        status: 'idle',
      },
    };

    addNode(newNode);
  }, [addNode]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  // Expose handleAddWidget to parent via callback
  React.useEffect(() => {
    onAddWidgetFromCatalog(handleAddWidget);
  }, [onAddWidgetFromCatalog, handleAddWidget]);

  return (
    <div className="workflow-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3498db', strokeWidth: 2 },
        }}
      >
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            const category = (node.data as WidgetNodeData)?.category;
            switch (category) {
              case 'Data': return '#2e7d32';
              case 'Visualize': return '#1976d2';
              case 'Model': return '#f57c00';
              case 'Evaluate': return '#c2185b';
              case 'Unsupervised': return '#7b1fa2';
              default: return '#7f8c8d';
            }
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        <Background variant="dots" gap={20} size={1} color="#ddd" />
      </ReactFlow>
    </div>
  );
};
