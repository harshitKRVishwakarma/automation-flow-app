/**
 * React flow imports
 */
import { applyEdgeChanges, applyNodeChanges } from "reactflow";

/**
 * Redux import
 */
import { createStore } from "redux";

/**
 * State managers
 */
import { createNode, deleteNode } from "./stateManagers/createNode";

/**
 * Utils import
 */
import { getRandomId } from "../utils/getRandomId";

/**
 * d3-hierarchy
 */
import getLayoutedElements from "./stateManagers/getLayoutedElements";

/**
 * Initial Nodes and Edges State
 */
const rootNode = {
	id: "root",
	position: { x: 360, y: 100 },
	type: "rootNode",
	data: { value: "rootNode", children: ["add-root"], parentId: null },
};
const addNode = {
	id: "add-root",
	position: { x: 360, y: 190 },
	type: "addNode",
	data: { value: "rootNode", children: [], parentId: "root" },
};

const initialState = {
	nodes: [rootNode, addNode],
	edges: [
		{
			id: "e1-default",
			source: "root",
			target: "add-root",
			animated: true,
		},
	],
};

const flowReducer = (state = initialState, action) => {
	const initialStateCopy = JSON.parse(JSON.stringify(state));

	if (action.type === "ADD_NODE_ROOT") {
		console.log("ADD_NODE_ROOT");

		const conditionalNode = {
			id: getRandomId(),
			position: { x: addNode.position.x, y: addNode.position.y },
			type: "conditionalNode",
			data: { value: "some conditonal data", parentId: "root" },
		};
		let updatedState = createNode(initialStateCopy, conditionalNode, "root");
		updatedState = deleteNode(updatedState, "add-root");

		console.log("UPDATED STATE", updatedState);
		return updatedState;
	}

	if (action.type === "ADD_NODE") {
		console.log("ADD_NODE");
		console.log("PAYLOAD", action.payload);
		const conditionalNode = {
			id: getRandomId(),
			position: {
				x: action.payload.position.x,
				y: action.payload.position.y,
			},
			type: "conditionalNode",
			data: {
				value: "some conditonal data",
				parentId: action.payload.data.parentId,
			},
		};

		let updatedState = createNode(
			initialStateCopy,
			conditionalNode,
			action.payload.data.parentId
		);
		updatedState = deleteNode(updatedState, action.payload.id);

		console.log("UPDATED STATE", updatedState);

		const { nodes, edges } = getLayoutedElements(
			updatedState.nodes,
			updatedState.edges
		);

		return { nodes, edges };
	}
	if (action.type === "NODES_CHANGE") {
		return {
			...state,
			nodes: applyNodeChanges(action.payload, state.nodes),
		};
	}
	if (action.type === "EDGES_CHANGE") {
		return {
			...state,
			edges: applyEdgeChanges(action.payload, state.edges),
		};
	}

	if (action.type === "LAYOUT_CHANGE") {
		return {
			nodes: action.payload.nodes,
			edges: action.payload.edges,
		};
	}

	return state;
};

const store = createStore(flowReducer);

export default store;
