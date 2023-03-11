import { createRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, Sticky } from "semantic-ui-react";

function App() {
    const contextRef = createRef <HTMLDivElement>()
    const [ activeItem, setActiveItem ] = useState("home");

    const handleItemClick = (item: string) => {
        console.log("nav item click: " + item);
        setActiveItem(item);
    }

    return (
        <div ref={contextRef}>
            <Sticky context={contextRef}>
                <Menu pointing secondary>
                    <Menu.Item
                        as={Link}
                        to='/home'
                        name='home'
                        active={activeItem === 'home'}
                        onClick={_ => handleItemClick("home")}
                    />
                    <Menu.Item
                        as={Link}
                        to='/profile'
                        name='profile'
                        active={activeItem === 'profile'}
                        onClick={_ => handleItemClick("profile")}
                    />
                    <Menu.Item
                        as={Link}
                        to='/admin'
                        name='admin'
                        active={activeItem === 'admin'}
                        onClick={_ => handleItemClick("admin")}
                    />
                </Menu>
            </Sticky>
            <Outlet />
        </div>
        
    )
}

export default App
