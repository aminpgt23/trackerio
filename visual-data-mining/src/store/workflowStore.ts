/**
 * Workflow Store - Zustand state management for the visual data mining workflow
 */

import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

export interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
  
  // Actions
  addNode: (node: Node) => void;
  updateNode: (nodeId: string, data: Partial<Node['data']>) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  clearWorkflow: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  addNode: (node: Node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (nodeId: string, data: Partial<Node['data']>) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
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
    }),
}));
