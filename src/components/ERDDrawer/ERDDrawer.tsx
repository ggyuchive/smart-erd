import React, { useState, useEffect } from 'react';
import { Layout, message, Button } from 'antd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import SQLEditor from './SQLEditor';
import ERDResult from './ERDResult';
import { Node, Edge } from 'react-flow-renderer';

const { Content } = Layout;

interface ERDDrawerProps {
  setUserDiagrams: React.Dispatch<React.SetStateAction<{ nodes: Node[]; edges: Edge[] }[]>>;
}

const ERDDrawer: React.FC<ERDDrawerProps> = ({ setUserDiagrams }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [leftWidth, setLeftWidth] = useState(window.innerWidth / 2);
  const [diagramData, setDiagramData] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });

  useEffect(() => {
    const handleResizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  const handleResize = (event: any, { size }: { size: { width: number } }) => {
    setLeftWidth(size.width);
  };

  const handleAddToUserList = () => {
    setUserDiagrams((prev) => [...prev, diagramData]);
    message.success('다이어그램이 성공적으로 저장되었습니다!');
  };

  return (
    <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
      {/* Code Editor Area */}
      <ResizableBox
        width={leftWidth}
        height={Infinity}
        minConstraints={[windowWidth / 4, Infinity]}
        maxConstraints={[windowWidth * 3 / 4, Infinity]}
        axis="x"
        resizeHandles={['e']}
        onResize={handleResize}
        style={{ display: 'inline-block' }}
      >
        <Content style={{ backgroundColor: '#f4f4f4', padding: '20px', height: '100%' }}>
          <SQLEditor setDiagramData={setDiagramData}/>
        </Content>
      </ResizableBox>

      {/* ERD Result Area */}
      <Content style={{ flexGrow: 1, backgroundColor: '#fff', padding: '20px' }}>
        <Button
          style={{ marginTop: '10px', fontSize: '16px', width: '100%' }}
          onClick={handleAddToUserList}
        >
          Add to User List
        </Button>
        <ERDResult diagramData={diagramData}/>
      </Content>
    </Layout>
  );
};

export default ERDDrawer;
