import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { HexagonIcon } from "lucide-react";

const handleStyle = { left: 10 };

export default function PracticeNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <HexagonIcon size={32} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}
