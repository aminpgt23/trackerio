/**
 * Workflow Store - Zustand state management for the visual data mining workflow
 * Enhanced with workflow persistence, templates, and data handling
 */

import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

export interface WidgetData {
  // Common fields
  label: string;
  widgetType: string;
  icon?: string;
  category?: string;
  status?: 'idle' | 'running' | 'completed' | 'error';
  
  // File Reader specific
  fileData?: any[];
  fileName?: string;
  columns?: string[];
  rowCount?: number;
  
  // Configuration for each widget type
  config?: Record<string, any>;
  
  // Output/results
  outputData?: any[];
  visualization?: any;
  model?: any;
  predictions?: any[];
  metrics?: Record<string, number>;
}

export interface WorkflowState {
  nodes: Node<WidgetData>[];
  edges: Edge[];
  selectedNode: string | null;
  workflowName: string;
  workflows: Array<{ id: string; name: string; nodes: Node[]; edges: Edge[]; createdAt: Date }>;
  templates: Array<{ id: string; name: string; description: string; nodes: Node[]; edges: Edge[] }>;
  
  // Actions
  addNode: (node: Node<WidgetData>) => void;
  updateNode: (nodeId: string, data: Partial<WidgetData>) => void;
  updateNodeConfig: (nodeId: string, configKey: string, value: any) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  clearWorkflow: () => void;
  
  // Workflow management
  setWorkflowName: (name: string) => void;
  saveWorkflow: () => void;
  loadWorkflow: (workflowId: string) => void;
  deleteWorkflow: (workflowId: string) => void;
  duplicateWorkflow: () => void;
  
  // Templates
  loadTemplate: (templateId: string) => void;
  
  // Data operations
  setNodeFileData: (nodeId: string, fileData: any[], fileName: string, columns: string[]) => void;
  setNodeOutputData: (nodeId: string, outputData: any[]) => void;
  getNodeData: (nodeId: string) => WidgetData | undefined;
  
  // Execute workflow
  executeWorkflow: () => Promise<void>;
  executeNode: (nodeId: string) => Promise<void>;
}

// Sample templates
const defaultTemplates = [
  {
    id: 'template-1',
    name: 'Basic Data Analysis',
    description: 'Load CSV → View Data → Scatter Plot',
    nodes: [],
    edges: []
  },
  {
    id: 'template-2',
    name: 'Machine Learning Pipeline',
    description: 'Load Data → Preprocess → Train Model → Evaluate',
    nodes: [],
    edges: []
  },
  {
    id: 'template-3',
    name: 'Clustering Analysis',
    description: 'Load Data → K-Means → Visualize Clusters',
    nodes: [],
    edges: []
  }
];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  workflowName: 'Untitled Workflow',
  workflows: [],
  templates: defaultTemplates,

  addNode: (node: Node<WidgetData>) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (nodeId: string, data: Partial<WidgetData>) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),

  updateNodeConfig: (nodeId: string, configKey: string, value: any) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId 
          ? { 
              ...node, 
              data: { 
                ...node.data, 
                config: { ...node.data.config, [configKey]: value } 
              } 
            } 
          : node
      ),
    })),

  removeNode: (nodeId: string) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode: state.selectedNode === nodeId ? null : state.selectedNode,
    })),

  addEdge: (edge: Edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),

  removeEdge: (edgeId: string) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    })),

  setSelectedNode: (nodeId: string | null) =>
    set({ selectedNode: nodeId }),

  clearWorkflow: () =>
    set({
      nodes: [],
      edges: [],
      selectedNode: null,
      workflowName: 'Untitled Workflow',
    }),

  setWorkflowName: (name: string) =>
    set({ workflowName: name }),

  saveWorkflow: () => {
    const state = get();
    const newWorkflow = {
      id: `workflow-${Date.now()}`,
      name: state.workflowName,
      nodes: state.nodes,
      edges: state.edges,
      createdAt: new Date(),
    };
    set((prevState) => ({
      workflows: [...prevState.workflows, newWorkflow],
    }));
    
    // Save to localStorage
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    localStorage.setItem('workflows', JSON.stringify([...savedWorkflows, newWorkflow]));
  },

  loadWorkflow: (workflowId: string) => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const workflow = savedWorkflows.find((w: any) => w.id === workflowId);
    if (workflow) {
      set({
        nodes: workflow.nodes,
        edges: workflow.edges,
        workflowName: workflow.name,
        selectedNode: null,
      });
    }
  },

  deleteWorkflow: (workflowId: string) => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const filtered = savedWorkflows.filter((w: any) => w.id !== workflowId);
    localStorage.setItem('workflows', JSON.stringify(filtered));
    set({ workflows: filtered });
  },

  duplicateWorkflow: () => {
    const state = get();
    const newNodes = state.nodes.map(node => ({
      ...node,
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: { x: node.position.x + 50, y: node.position.y + 50 }
    }));
    
    const newEdges = state.edges.map(edge => ({
      ...edge,
      id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source: newNodes.find(n => n.data.label === state.nodes.find(s => s.id === edge.source)?.data.label)?.id || edge.source,
      target: newNodes.find(n => n.data.label === state.nodes.find(s => s.id === edge.target)?.data.label)?.id || edge.target
    }));
    
    set({
      nodes: newNodes as Node<WidgetData>[],
      edges: newEdges,
      workflowName: `${state.workflowName} (Copy)`,
    });
  },

  loadTemplate: (templateId: string) => {
    const template = defaultTemplates.find(t => t.id === templateId);
    if (template) {
      // For now, just clear and show message - templates need proper implementation
      set({
        nodes: [],
        edges: [],
        workflowName: template.name,
      });
    }
  },

  setNodeFileData: (nodeId: string, fileData: any[], fileName: string, columns: string[]) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, fileData, fileName, columns } }
          : node
      ),
    })),

  setNodeOutputData: (nodeId: string, outputData: any[]) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, outputData } }
          : node
      ),
    })),

  getNodeData: (nodeId: string) => {
    const state = get();
    const node = state.nodes.find(n => n.id === nodeId);
    return node?.data;
  },

  executeWorkflow: async () => {
    const state = get();
    
    // Simple execution - mark all nodes as completed for demo
    for (const node of state.nodes) {
      await get().executeNode(node.id);
    }
  },

  executeNode: async (nodeId: string) => {
    const state = get();
    const node = state.nodes.find(n => n.id === nodeId);
    
    if (!node) return;
    
    // Mark as running
    get().updateNode(nodeId, { status: 'running' });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Process based on widget type
    const widgetType = node.data.widgetType;
    
    if (widgetType === 'fileReader') {
      // File reader already has data loaded
      get().updateNode(nodeId, { status: 'completed' });
    } else if (widgetType === 'dataTable') {
      // Get input data from connected node
      const incomingEdge = state.edges.find(e => e.target === nodeId);
      if (incomingEdge) {
        const sourceData = get().getNodeData(incomingEdge.source);
        if (sourceData?.fileData) {
          get().setNodeOutputData(nodeId, sourceData.fileData);
          get().updateNode(nodeId, { status: 'completed' });
        }
      }
    } else if (['scatterPlot', 'lineChart', 'barChart'].includes(widgetType)) {
      // Visualization widgets
      const incomingEdge = state.edges.find(e => e.target === nodeId);
      if (incomingEdge) {
        const sourceData = get().getNodeData(incomingEdge.source);
        if (sourceData?.fileData || sourceData?.outputData) {
          // Create mock visualization result
          get().updateNode(nodeId, { 
            status: 'completed',
            visualization: { type: widgetType, data: sourceData.fileData || sourceData.outputData }
          });
        }
      }
    } else {
      // Default: mark as completed
      get().updateNode(nodeId, { status: 'completed' });
    }
  },
}));

// Load saved workflows on init
if (typeof window !== 'undefined') {
  const savedWorkflows = localStorage.getItem('workflows');
  if (savedWorkflows) {
    try {
      const parsed = JSON.parse(savedWorkflows);
      // Note: We can't directly set state here, but workflows will be loaded when needed
    } catch (e) {
      console.error('Failed to load saved workflows:', e);
    }
  }
}
