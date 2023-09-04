/**
 * React imports
 */
import { useCallback, useEffect, useMemo, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

/**
 * React flow imports
 */
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	Panel,
	useReactFlow,
} from "reactflow";

/**
 * Styles imports
 */
import "reactflow/dist/style.css";
import "./AutomationFlow.css";

/**
 * Custom Nodes
 */
import RootNode from "./Nodes/RootNode";
import AddNode from "./Nodes/AddNode";
import BooleanNode from "./Nodes/BooleanNode";
import ConditionalNode from "./Nodes/ConditionalNode";
import MiniMapNode from "./Nodes/MiniMapNode";

const AutomationFlow = () => {
	console.log("AUTOMATIONFLOW RENDERS");

	/**
	 * Ensures that the nodes remain
	 * in the viewable area of the
	 * screen
	 */
	const { fitView } = useReactFlow();

	const nodes = useSelector((state) => state.nodes);
	const edges = useSelector((state) => state.edges);

	const [variant, setVariant] = useState("dots");

	const nodeColor = (node) => {
		switch (node.type) {
			case "rootNode":
				return "#6AC96E";
			case "addNode":
				return "#17c2e0";
			case "booleanNode":
				return "#D1005D";
			case "conditionalNode":
				return "#1c1c1f";
			default:
				return "#ff0072";
		}
	};

	const onNodesChangeHandler = (changes) => {
		dispatch({ type: "NODES_CHANGE", payload: changes });

		fitView();
	};

	const onEdgesChangeHandler = (changes) => {
		dispatch({ type: "EDGES_CHANGE", payload: changes });
	};

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

	const onNodeClickHandler = useCallback(
		(event, node) => {
			console.log("NODE_CLICKED", node);
			if (node.id === "add-root") {
				dispatch({ type: "ADD_NODE_ROOT" });
			}

			if (node.id !== "add-root" && node.type === "addNode") {
				dispatch({ type: "ADD_NODE", payload: node });
			}
		},
		[dispatch]
	);

	return (
		<>
			<div style={{ width: "100vw", height: "100vh" }}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodeClick={onNodeClickHandler}
					onNodesChange={onNodesChangeHandler}
					onEdgesChange={onEdgesChangeHandler}
					fitView>
					<Panel position="top-left">
						<div>Set Variant Style</div>
						<div>
							<button onClick={() => setVariant("dots")}>Dots</button>
							<button onClick={() => setVariant("lines")}>Lines</button>
							<button onClick={() => setVariant("cross")}>Cross</button>
						</div>
					</Panel>
					<MiniMap
						nodeColor={nodeColor}
						pannable={true}
						zoomable={true}
						nodeComponent={MiniMapNode}
					/>
					<Controls />
					<Background variant={variant} />
				</ReactFlow>
			</div>
		</>
	);
};

export default AutomationFlow;
