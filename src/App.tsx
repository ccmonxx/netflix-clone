import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/search">
					<Search />
				</Route>
				<Route path="/tv">
					<Tv />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
