import { useState, useCallback } from "react";
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  Panel,
  useNodesState,
  useEdgesState,
  addEdge
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "Client" } },
  { id: "2", position: { x: 400, y: 100 }, data: { label: "Load Balancer" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
];

const NODE_TYPES = ["Client", "Server", "Database", "Cache", "Load Balancer"];

export function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddNode = (label) => {
    const newNode = {
      id: `node-${Date.now()}`,
      position: { 
        x: 250 + Math.random() * 50, 
        y: 100 + Math.random() * 50 
      },
      data: { label },
    };
    
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-full w-full">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        
        <Panel position="top-center" className="flex gap-2 rounded-md bg-white p-2 shadow-md">
          {NODE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onAddNode(type)}
              className="rounded bg-slate-800 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              + {type}
            </button>
          ))}
        </Panel>
      </ReactFlow>
    </div>
  );
}