import {Route, Routes, HashRouter} from "react-router-dom";
import {EventsPage} from "./pages";


function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<EventsPage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App
