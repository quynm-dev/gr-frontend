import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath
} from "reactflow";

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
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all"
          }}
          className="nodrag nopan absolute text-xs"
          onClick={data.onClick}
        >
          <div className="flex items-center">
            <div className="p-1.5">
              {data.value}
            </div>
            <div className="flex items-center justify-center w-8">
              <img
                src={data.src}
                alt={data.alt}
                className="w-fit"
              />
            </div>
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default Edge
