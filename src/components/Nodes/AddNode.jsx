/**
 * Reacflow imports
 */
import { Handle, Position } from "reactflow";

/**
 * Redux imports
 */

/**
 * Styles
 */
import "./Node.css";
import "./AddNode.css";

const AddNode = (props) => {
	console.log("prosssss", props);
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="node add-node">Add</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
};

export default AddNode;
