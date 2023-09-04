import { Handle, Position } from "reactflow";

/**
 * Styles
 */
import "./Node.css";

const RootNode = () => {
	return (
		<>
			<div className="node root-node">Root</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
};

export default RootNode;
