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

const rootNode = {
	id: "root",
	position: { x: 360, y: 100 },
	type: "rootNode",
	data: { value: "rootNode" },
};

const addNode = {
	id: "add-root",
	position: { x: 360, y: 190 },
	type: "addNode",
	data: { value: "rootNode" },
};

const initialState = {
	nodes: [rootNode, addNode],
	edges: [
		{
			id: "e1-default",
			source: "root",
			target: "add-root",
			type: "straight",
		},
	],
};

const flowReducer = (state = initialState, action) => {
	const initialStateCopy = JSON.parse(JSON.stringify(state));

	if (action.type === "ADD_NODE_ROOT") {
		console.log("ADD_NODE_ROOT");

		const conditionalNode = {
			id: getRandomId(),
			position: { x: rootNode.position.x, y: rootNode.position.y + 100 },
			type: "conditionalNode",
			data: { value: "some conditonal data" },
		};
		let updatedState = createNode(initialStateCopy, conditionalNode, "root");
		updatedState = deleteNode(updatedState, "add-root");

		console.log("UPDATED STATE", updatedState);
		return updatedState;
	}

	if (action.type === "ADD_NODE") {
		console.log("ADD_NODE");
		const conditionalNode = {
			id: getRandomId(),
			position: {
				x: action.payload.position.x,
				y: action.payload.position.y + 100,
			},
			type: "conditionalNode",
			data: {
				value: "some conditonal data",
				parentId: action.payload.data.parentId,
			},
		};
		console.log("CONDITIONAL_NODE", conditionalNode);
		let updatedState = createNode(initialStateCopy, conditionalNode, action.payload.data.parentId);
		updatedState = deleteNode(updatedState, action.payload.id);
		return updatedState;
	}
	return state;
};

const store = createStore(flowReducer);

export default store;
