import React from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import {Link} from '../routes';

export default ()=> {
    return (
        <Menu style={{marginTop:'10px' }}>
            <Link route="/">
                <a className="item">HelloNet Market</a>
            </Link>
           
            <Menu.Menu position="right">
                <Dropdown item text='Company View'>
                    <Dropdown.Menu>
                   
                            <Link route="/company/dashboard">
                                <a className="item">Dashboard</a>
                            </Link>
                      
                            <Link route="/">
                                <a className="item">My Agents</a>
                            </Link>
                       
                            <Link route="/listings/new">
                                <a className="item">Create Listing</a>
                            </Link>
                       
                            <Link route="/listings/index">
                                <a className="item">My Listings</a>
                            </Link>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text='Agent View'>
                    <Dropdown.Menu>
                    
                            <Link route="/agent/dashboard">
                                <a className="item">Dashboard</a>
                            </Link>
                      
                            <Link route="/listings/index">
                                <a className="item">View Listings</a>
                            </Link>
                       
                            <Link route="/">
                                <a className="item">My Job Applications</a>
                            </Link>
                      
                            <Link route="/">
                                <a className="item">My Profile</a>
                            </Link>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown item text='Auditor View'>
                
                    <Dropdown.Menu>
                   
                            <Link route="/auditor/dashboard">
                                <a className="item">Dashboard</a>
                            </Link>
                       
                            <Link route="/listings/index">
                                <a className="item">View Listings</a>
                            </Link>
                        
                            <Link route="/">
                                <a className="item">My Job Applications</a>
                            </Link>
                       
                            <Link route="/">
                                <a className="item">My Profile</a>
                            </Link>
                    </Dropdown.Menu>
                </Dropdown>
            <Link route="/listings/index">
                <a className="item">Listings</a>
            </Link>
            
            </Menu.Menu>
            
        </Menu>
    );
};