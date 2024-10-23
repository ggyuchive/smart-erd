import React from 'react';
import { Node, Edge } from 'react-flow-renderer';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

interface UserListProps {
  diagrams: { nodes: Node[]; edges: Edge[] }[];
  onDelete: (index: number) => void;
}

const UserList: React.FC<UserListProps> = ({ diagrams, onDelete }) => {
  const navigate = useNavigate();

  const handleDiagramClick = (index: number) => {
    navigate('/main/erd');
  };

  const confirmDelete = (index: number) => {
    Modal.confirm({
      title: '삭제 확인',
      content: '삭제하시겠습니까?',
      okText: '예',
      okType: 'danger',
      cancelText: '아니오',
      onOk: () => onDelete(index),
    });
  };

  return (
    <div>
      {diagrams.length === 0 ? (
        <p>저장된 다이어그램이 없습니다.</p>
      ) : (
        diagrams.map((diagram, index) => (
          <div 
            key={index}
            style={{ 
              backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <ul>
              {diagram.nodes.map(node => (
                <li key={node.id}>{node.data.label}</li>
              ))}
            </ul>
            <ul>
              {diagram.edges.map(edge => (
                <li key={edge.id}>{`${edge.source} -> ${edge.target}`}</li>
              ))}
            </ul>
            <Button onClick={() => handleDiagramClick(index)} style={{ marginRight: '10px' }}>
              {`Diagram ${index + 1}`}
            </Button>
            <Button danger onClick={() => confirmDelete(index)}>
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
