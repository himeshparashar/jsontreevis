import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  OnNodesChange,
  OnEdgesChange,
  MiniMap,
  Panel,
} from '@xyflow/react';

const nodeStyles = {
  object: { color: 'purple', label: 'Object' },
  array: { color: 'green', label: 'Array' },
  primitive: { color: 'orange', label: 'Primitive' },
};

type NodeInfo = {
  label: string;
  nodeType: 'object' | 'array' | 'primitive';
  val?: any;
  path: string;
}

type Props = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
}

const TreeView = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange, 
}: Props) => {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <p className="text-lg font-semibold">No visualization yet</p>
          <p className="text-sm mt-2">
            Enter JSON and click "Generate Tree" to visualize
          </p>
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      attributionPosition="bottom-left"
    >
      <Background />
      <Controls />
      <MiniMap
        nodeColor={(node) => {
          const nodeData = node.data as unknown as NodeInfo;
          return nodeStyles[nodeData.nodeType].color;
        }}
        nodeStrokeWidth={3}
      />
      <Panel position="top-left" className="bg-white p-2 rounded-lg shadow-md">
        <div className="text-xs text-gray-600">
          <p> -  Tip: Use mouse wheel to zoom</p>
          <p> - Drag to pan the canvas</p>
        </div>
      </Panel>
    </ReactFlow>
  );
}

export default TreeView;
