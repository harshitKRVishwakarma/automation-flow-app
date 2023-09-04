import { Handle, Position } from "reactflow";

import "./Node.css";

const ConditionalNode = () => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="node conditional-node">Condition</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
};

export default ConditionalNode;
