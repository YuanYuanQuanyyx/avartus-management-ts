import React from 'react'
import { ifExpire, getToken } from '../../utils/auth'

class RegularUser extends React.Component<any, any> {

    render() {
        console.log(ifExpire());
        return  (
            <div>
                <h1>Your token is:</h1>
                {getToken()}
            </div>
        )
    }
}

export default RegularUser
