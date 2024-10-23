import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ViewUpdate } from '@codemirror/view';
import { Layout, Button } from 'antd';
import { ResizableBox } from 'react-resizable';
import { parseSQL, generateEdgesFromCardinality } from '../../Parser';
import 'react-resizable/css/styles.css';
import { Node, Edge } from 'react-flow-renderer';

interface SQLEditorProps {
  setDiagramData: React.Dispatch<React.SetStateAction<{ nodes: Node[]; edges: Edge[] }>>;
}

const { Content } = Layout;
const startSQLStr = "CREATE TABLE USER (\n\tID varchar(20) PRIMARY KEY,\n\tPASSWORD varchar(20),\n\tISADMIN boolean\n);\nCREATE TABLE LOG (\n\tID varchar(20),\n\tORDER int PRIMARY KEY,\n\tFOREIGN KEY (ID) REFERENCES USER(ID)\n);\n";
const startCardStr = "-- TABLE_NAME1(cardinality1) <-> TABLE_NAME2(cardinality2)\nUSER(1) <-> LOG(0..N)";

const generateERDiagram = (tables: any[], cards: Edge[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  tables.forEach((table, index) => {
    nodes.push({
      id: table.tableName,
      data: {
        label: (
          <div style={{ textAlign: 'left' }}>
            <strong>{table.tableName}</strong>
            <hr style={{ borderTop: '1px solid black' }}/>
            <p>
            {table.columns.map((col: any) => {
                let labelPrefix = '';

                if (col.primaryKey && col.foreignKey) {
                  labelPrefix = 'PK, FK | ';
                } else if (col.primaryKey) {
                  labelPrefix = 'PK | ';
                } else if (col.foreignKey) {
                  labelPrefix = 'FK | ';
                } else {
                  labelPrefix = '   | ';
                }
                return (
                  <p key={col.name} style={{ margin: '4px 0', fontSize: '10px' }}>
                    {labelPrefix}{col.name} {col.type}
                  </p>
                );
            })}
            </p>
          </div>
        ),
      },
      position: { x: 100 + index * 200, y: 100 }, // 노드의 위치 설정
      type: 'default',
      connectable: false,
    });
  });

  cards.forEach((edge) => {
    edges.push(edge);
  });

  return { nodes, edges };
};

const SQLEditor: React.FC<SQLEditorProps> = ({ setDiagramData }) => {
  const menuHeight = 164;
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [topHeight, setTopHeight] = useState((window.innerHeight-menuHeight)*2 / 3);

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

  const [SQLcode, setSQLCode] = useState<string>(startSQLStr);
  const [Cardcode, setCardCode] = useState<string>(startCardStr);

  const handleSQLCodeChange = (value: string, viewUpdate: ViewUpdate) => {
    setSQLCode(value);
  };
  const handleCardCodeChange = (value: string, viewUpdate: ViewUpdate) => {
    setCardCode(value);
  };
  const handleGenerateERD = () => {
    const tables = parseSQL(SQLcode);
    const cards = generateEdgesFromCardinality(Cardcode);
    const { nodes, edges } = generateERDiagram(tables, cards);
    setDiagramData({ nodes, edges });
  };

  return (
    <Layout style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      {/* SQL Editor Area */}
      <strong>SQL Statement</strong>
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
        <Content style={{ padding: '5px' }}>
          <CodeMirror
            value={SQLcode}
            height="300px"
            extensions={[sql()]}
            onChange={(value: string, viewUpdate: ViewUpdate) => handleSQLCodeChange(value, viewUpdate)}
            theme='dark'
          />
        </Content>
      </ResizableBox>

      {/* Cardnality Editor Area */}
      <strong>Cardinality Statement</strong>
      <Content style={{ flexGrow: 1, padding: '5px' }}>
        <CodeMirror
          value={Cardcode}
          height="100px"
          extensions={[sql()]}
          onChange={(value: string, viewUpdate: ViewUpdate) => handleCardCodeChange(value, viewUpdate)}
          theme='dark'
        />
      </Content>
      <Button onClick={handleGenerateERD} style={{ marginTop: '10px', fontSize: '16px' }}>Generate ER Diagram</Button>
    </Layout>
  );
};

export default SQLEditor;
