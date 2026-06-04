import { useCallback } from "react";
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

const NODE_TYPES = ["Client", "Server", "Database", "Cache", "Load Balancer", "CDN", "Queue", "API Gateway"];

export function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddNode = (label: string) => {
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
        
        <Panel position="top-center" className="flex flex-wrap gap-1.5 rounded-lg bg-white/90 backdrop-blur-sm p-2 shadow-lg border border-gray-200/60">
          {NODE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onAddNode(type)}
              className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-white transition-all hover:bg-slate-700 hover:shadow-md active:scale-95"
            >
              + {type}
            </button>
          ))}
        </Panel>
      </ReactFlow>
    </div>
  );
}