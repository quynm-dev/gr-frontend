import React from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import DateTimePicker from './components/DateTimePicker';

import { nodes as initialNodes, edges as initialEdges } from './data/binance';

import 'reactflow/dist/style.css';
import './index.css';

const onInit = (instance) => {
  instance.zoomTo(0.9)
}

const App = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div>
      <div style={{ position: 'absolute', left: '20px', top: '20px', zIndex: '2' }}><DateTimePicker /></div>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodesDraggable={false}
          onInit={onInit}
          fitView
        >
          <MiniMap zoomable pannable />
          <Controls showInteractive={false} />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;
