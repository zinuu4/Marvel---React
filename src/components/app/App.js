import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const App = () => {

    return (
        <Router>
            <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                <AnimatePresence>

                    <Routes>

                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>

                    </Routes>

                </AnimatePresence>
                </Suspense>
            </main>
            </div>
        </Router>
    )
}

export default App;