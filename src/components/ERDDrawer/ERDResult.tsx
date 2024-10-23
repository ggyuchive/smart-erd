import React from 'react';
import 'react-resizable/css/styles.css';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';

interface ERDiagramProps {
  diagramData: { nodes: Node[]; edges: Edge[] };
}

const ERDResult: React.FC<ERDiagramProps> = ({ diagramData }) => {
  return (
    <div style={{ height: '90vh', marginTop: '0px', border: '1px solid #ddd' }}>
      <ReactFlow nodes={diagramData.nodes} edges={diagramData.edges} fitView />
    </div>
  );
};

export default ERDResult;
