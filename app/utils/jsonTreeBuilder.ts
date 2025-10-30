import { Node, Edge } from '@xyflow/react';

const NODE_TYPES = {
  object: { color: 'purple', label: 'Object' }, 
  array: { color: 'green', label: 'Array' },
  primitive: { color: 'orange', label: 'Primitive' },
};

interface JsonNode extends Node {
  data: {
    label: string;
    nodeType: 'object' | 'array' | 'primitive';
    value?: any;
    path: string;
  };
}

export function buildJsonTree(jsonData: any): { nodes: JsonNode[]; edges: Edge[] } {
  const nodes: JsonNode[] = [];
  const edges: Edge[] = [];
  let nodeId = 0;

  const traverse = (
    obj: any,
    parentId: string | null,
    key: string | number,
    level: number,
    path: string
  ) => {
    const currentId = `node-${nodeId++}`;
    const xOffset = 300;
    const yOffset = 100;
    const position = {
      x: level * xOffset,
      y: nodes.filter((n) => n.position.x === level * xOffset).length * yOffset,
    };

    let nodeType: 'object' | 'array' | 'primitive';
    let label: string;

    if (obj === null) {
      nodeType = 'primitive';
      label = `${key}: null`;
    } else if (Array.isArray(obj)) {
      nodeType = 'array';
      label = `${key} []`;
    } else if (typeof obj === 'object') {
      nodeType = 'object';
      label = `${key} {}`;
    } else {
      nodeType = 'primitive';
      const value = typeof obj === 'string' ? `"${obj}"` : String(obj);
      label = `${key}: ${value}`;
    }

    const node: JsonNode = {
      id: currentId,
      type: 'default',
      position,
      data: {
        label,
        nodeType,
        value: obj,
        path,
      },
      style: {
        background: NODE_TYPES[nodeType].color,
        color: 'white',
        border: '2px solid #fff',
        borderRadius: '8px',
        padding: '10px 15px',
        fontSize: '14px',
      },
    };

    nodes.push(node);

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
    }

    if (obj !== null && typeof obj === 'object') {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const childPath = `${path}[${index}]`;
          traverse(item, currentId, index, level + 1, childPath);
        });
      } else {
        Object.entries(obj).forEach(([childKey, childValue]) => {
          const childPath = path ? `${path}.${childKey}` : childKey;
          traverse(childValue, currentId, childKey, level + 1, childPath);
        });
      }
    }
  };

  traverse(jsonData, null, 'root', 0, '$');
  return { nodes, edges };
}

export function parseJsonPath(path: string): string[] {
  return path
    .replace(/^\$\.?/, '')
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
}
