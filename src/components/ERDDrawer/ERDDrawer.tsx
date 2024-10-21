import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ViewUpdate } from '@codemirror/view';
import { Layout } from 'antd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import SQLEditor from './SQLEditor'
import ERDResult from './ERDResult'

const { Content } = Layout;

const ERDDrawer: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [leftWidth, setLeftWidth] = useState(window.innerWidth / 2);
  const [code, setCode] = useState<string>('');

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

  const handleCodeChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
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
          <SQLEditor/>
        </Content>
      </ResizableBox>

      {/* ERD Result Area */}
      <Content style={{ flexGrow: 1, backgroundColor: '#fff', padding: '20px' }}>
        <ERDResult/>
      </Content>
    </Layout>
  );
};

export default ERDDrawer;
