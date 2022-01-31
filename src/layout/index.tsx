import React from "react";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

const Layout:React.FC = () => {
    return (
        <Container className={'pt-5'}>
            <p className={'fs-1'}>Dashboard</p>
            <div className={'w-full border shadow-sm rounded'}>
                <Outlet/>
            </div>
        </Container>
    )
}

export default Layout