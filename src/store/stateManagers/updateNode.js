/**
 * @description Updates a node in the state
 * @param {Node[]} state Existing state
 * @param {Node} node Node to update
 * @returns Updated state
 */
export const updateNode = (state, node) => {
	return {
		...state,
		nodes: state.nodes.map((n) => {
			if (n.id === node.id) {
				return node;
			}
			return n;
		}),
	};
};
