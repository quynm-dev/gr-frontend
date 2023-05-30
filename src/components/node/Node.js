import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { FaWallet } from "react-icons/fa";

export default memo(({ data, isConnectable }) => {
  const attributes = {
    ...(data.isInput ? { position: Position.Bottom, type: "source" } : { position: Position.Top, type: "target" })
  }

  return (
    <div style={{
      backgroundColor: 'red',
      width: '150px',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      border: '1px solid #1a192b',
      borderRadius: '3px',
      color: 'white'
    }}
      onClick={data.onClick}
    >
      <Handle
        isConnectable={isConnectable}
        {...attributes}
      />
      <div>
        {
          data.isComposite ? <FaWallet /> : data.label
        }
      </div>
    </div >
  );
});