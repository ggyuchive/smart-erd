import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ViewUpdate } from '@codemirror/view';
import { Layout } from 'antd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const { Content } = Layout;

const SQLEditor: React.FC = () => {
  const menuHeight = 164;
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [topHeight, setTopHeight] = useState((window.innerHeight-menuHeight) / 2);

  useEffect(() => {
    const handleResizeWindow = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  const handleResize = (event: any, { size }: { size: { height: number } }) => {
    setTopHeight(size.height);
  };

  const [code, setCode] = useState<string>('');

  const handleCodeChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
  };

  return (
    <Layout style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      {/* SQL Editor Area */}
      <ResizableBox
        width={Infinity}
        height={topHeight}
        minConstraints={[Infinity, windowHeight / 4]}
        maxConstraints={[Infinity, windowHeight * 3 / 4]}
        axis="y"
        resizeHandles={['s']}
        onResize={handleResize}
        style={{ display: 'inline-block' }}
      >
        <Content style={{ padding: '10px' }}>
          <CodeMirror
            value={code}
            height="100%"
            extensions={[sql()]}
            onChange={(value: string, viewUpdate: ViewUpdate) => handleCodeChange(value, viewUpdate)}
            theme='dark'
          />
        </Content>
      </ResizableBox>

      {/* Cardnality Editor Area */}
      <Content style={{ flexGrow: 1, padding: '10px' }}>
        <CodeMirror
          value={code}
          height="100%"
          extensions={[sql()]}
          onChange={(value: string, viewUpdate: ViewUpdate) => handleCodeChange(value, viewUpdate)}
          theme='dark'
        />
      </Content>
    </Layout>
  );
};

export default SQLEditor;
