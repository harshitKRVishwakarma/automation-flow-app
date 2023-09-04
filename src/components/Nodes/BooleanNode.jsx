import { Handle, Position } from "reactflow";

import "./Node.css"

const BooleanNode = ({ data }) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="node boolean-node">{data.value ? "Yes" : "No"}</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
};

export default BooleanNode;
