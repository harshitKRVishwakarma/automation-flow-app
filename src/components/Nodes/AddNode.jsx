/**
 * Reacflow imports
 */
import { Handle, Position } from "reactflow";

/**
 * Redux imports
 */
import { useDispatch } from "react-redux";

/**
 * Styles
 */
import "./Node.css";
import "./AddNode.css";

const AddNode = () => {
	return (
		<>
			<Handle
				type="target"
				position={Position.Top}
			/>
			<div className="node">Add</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</>
	);
};

export default AddNode;
