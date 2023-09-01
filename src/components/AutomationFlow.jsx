/**
 * React imports
 */
import { useCallback, useEffect, useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";

/**
 * React flow imports
 */
import ReactFlow, {
	addEdge,
	MiniMap,
	Controls,
	Background,
	useReactFlow,
} from "reactflow";

/**
 * Styles imports
 */
import "reactflow/dist/style.css";

/**
 * Customa Nodes
 */
import RootNode from "./Nodes/RootNode";
import AddNode from "./Nodes/AddNode";
import BooleanNode from "./Nodes/BooleanNode";
import ConditionalNode from "./Nodes/ConditionalNode";

const AutomationFlow = () => {
	console.log("AUTOMATIONFLOW RENDERS");

	const nodes = useSelector((state) => state.nodes);
	const edges = useSelector((state) => state.edges);
	const dispatch = useDispatch();

	const nodeTypes = useMemo(
		() => ({
			rootNode: RootNode,
			addNode: AddNode,
			booleanNode: BooleanNode,
			conditionalNode: ConditionalNode,
		}),
		[]
	);

	const reactFlow = useReactFlow();

	useEffect(() => {
		console.log(reactFlow);
	}, [reactFlow]);

	const onNodeClickHandler = (event, node) => {
		console.log("NODE_CLICKED", node);
		if (node.id === "add-root") {
			dispatch({ type: "ADD_NODE_ROOT" });
		}

		if (node.type === "addNode") {
			// TODO: render conditional
			dispatch({ type: "ADD_NODE", payload: node });
		}
	};

	return (
		<>
			<div style={{ width: "100vw", height: "100vh" }}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodeClick={onNodeClickHandler}>
					<MiniMap />
					<Controls />
					<Background />
				</ReactFlow>
			</div>
		</>
	);
};

export default AutomationFlow;