import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Console from "./components/Console";
import './main.less'
import 'tdesign-react/es/style/index.css'; // 少量公共样式
import { routes } from './config/route'
import { initNav } from "./utils/login";

const InitNav = () => {
    const navigate = useNavigate()

    useEffect(() => {
        initNav(navigate)
    }, [])

    return <Outlet />
}

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route element={<InitNav />}>
                    {
                        Object.values(routes).filter(i => i.dontNeedMenu).map(i => {
                            return (
                                // @ts-ignore
                                <Route key={`route_${i.path}`} path={i.path} element={i.element} />
                            )
                        })
                    }
                    <Route path={"/"} element={<Console />}>
                        {
                            Object.values(routes).filter(i => !i.dontNeedMenu).map(i => {
                                return (
                                    // @ts-ignore
                                    <Route key={`route_${i.path}`} path={i.path} element={i.element} />
                                )
                            })
                        }
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
