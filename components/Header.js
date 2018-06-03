import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default ()=> {
    return (
        <Menu style={{marginTop:'10px' }}>
        <Link route="/">
            <a className="item">HelloNet Market</a>
         </Link>
           
            <Menu.Menu position="right">
            <Link route="/">
            <a className="item"> My Profile</a>
         </Link>
         <Link route="/">
            <a className="item">Listings</a>
         </Link>
         <Link route="/listing/new">
            <a className="item">+</a>
         </Link>
            </Menu.Menu>
            
        </Menu>
    );
};