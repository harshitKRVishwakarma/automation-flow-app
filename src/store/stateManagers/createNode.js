import { getRandomId } from "../../utils/getRandomId";

/**
 *
 * @param {*} state Current state
 * @param {*} newNode New node to add
 * @param {*} parentId Id of parent node
 * @returns Updated state
 */
export const createNode = (state, newNode, parentId) => {
	state.nodes.push(newNode);

	if (newNode.type === "conditionalNode") {
		const trueNode = {
			id: getRandomId(),
			position: { x: newNode.position.x - 100, y: newNode.position.y + 100 },
			type: "booleanNode",
			data: { value: true, parentId: newNode.id },
		};

		createNode(state, trueNode, newNode.id);

		const newEdge = {
			id: getRandomId(),
			source: parentId,
			target: newNode.id,
			type: "straight",
		};
		state.edges.push(newEdge);

		const newEdgeTrue = {
			id: getRandomId(),
			source: newNode.id,
			target: trueNode.id,
		};
		state.edges.push(newEdgeTrue);

		const falseNode = {
			id: getRandomId(),
			position: { x: newNode.position.x + 100, y: newNode.position.y + 100 },
			type: "booleanNode",
			data: { value: false, parentId: newNode.id },
		};
		createNode(state, falseNode, newNode.id);
		const newEdgeFalse = {
			id: getRandomId(),
			source: newNode.id,
			target: falseNode.id,
		};
		state.edges.push(newEdgeFalse);
	}

	if (newNode.type === "booleanNode") {
		const addNode = {
			id: getRandomId(),
			position: { x: newNode.position.x, y: newNode.position.y + 100 },
			type: "addNode",
			data: { value: "addNode", parentId: newNode.id },
		};
		createNode(state, addNode, newNode.id);
	}

	if (newNode.type === "addNode") {
		const newEdge = {
			id: getRandomId(),
			source: parentId,
			target: newNode.id,
			type: "straight",
		};

		state.edges.push(newEdge);

		return state;
	}
	return state;
};

/**
 *
 * @param {*} state Current state
 * @param {*} nodeId Id of node to delete
 * @returns Updated state
 */
export const deleteNode = (state, nodeId) => {
	const nodes = state.nodes.filter((node) => node.id !== nodeId);
	const edges = state.edges.filter(
		(edge) => edge.source !== nodeId || edge.target !== nodeId
	);
	return { nodes, edges };
};
