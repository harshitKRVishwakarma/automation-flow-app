import { Handle, Position } from "reactflow";

import "./Node.css"

const BooleanNode = ({ data }) => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="node">{data.value ? "True" : "False"}</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
};

export default BooleanNode;
