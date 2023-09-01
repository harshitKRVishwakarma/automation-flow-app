/**
 * React flow imports
 */
import { ReactFlowProvider } from "reactflow";

/**
 * React redux
 */
import { Provider } from "react-redux";
import store from "./store";

/**
 * Components
 */
import AutomationFlow from "./components/AutomationFlow";

const App = () => {
	return (
		<>
			<Provider store={store}>
				<ReactFlowProvider>
					<AutomationFlow />
				</ReactFlowProvider>
			</Provider>
		</>
	);
};

export default App;
