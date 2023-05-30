import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath
} from "reactflow";
import { RiMoneyCnyCircleFill } from "react-icons/ri";

const Edge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            fontSize: '10px',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all"
          }}
          className="nodrag nopan"
          onClick={data.onClick}
        >
          {
            !data.isComposite ?
              (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ padding: '5px' }}>
                    {data.value}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30px'
                  }}>
                    <img
                      src={data.src}
                      alt={data.alt}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ) :
              (
                <div style={{ fontSize: '50px' }}>
                  <RiMoneyCnyCircleFill />
                </div>
              )
          }
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default Edge
