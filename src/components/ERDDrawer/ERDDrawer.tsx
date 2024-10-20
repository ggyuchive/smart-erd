import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { ViewUpdate } from '@codemirror/view';  // ViewUpdate 타입 가져오기

const ERDDrawer: React.FC = () => {
  const [code, setCode] = useState<string>('');  // 상태 타입을 명시적으로 설정

  const handleCodeChange = (value: string, viewUpdate: ViewUpdate) => {
    setCode(value);  // value는 string 타입
  };

  return (
    <div style={{ height: '300px', border: '1px solid #ddd' }}>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[sql()]}
        onChange={(value: string, viewUpdate: ViewUpdate) => handleCodeChange(value, viewUpdate)}  // value와 viewUpdate의 타입을 명시
        theme='dark'
      />
    </div>
  );
};

export default ERDDrawer;
