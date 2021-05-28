import React from 'react';
import { connect } from 'react-redux'

class ComB extends React.Component<any, any> {

    render () {
        console.log("ComB: ", this.props)
        return (
            <div>{this.props.count}</div>
        )
    }
}

const mapStateToProps = (state: number) => {
    console.log("ComB: ", state)
    return state;
}


export default connect(mapStateToProps)(ComB)