import React from "react";
import Header from "./header/Header";

type Props = {
    children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
    return (
        <section>
            <Header />
            {children}
        </section>
    )
}

export default Layout;