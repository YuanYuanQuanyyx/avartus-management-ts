import React from 'react';
import { connect } from 'react-redux'

class ComA extends React.Component<any, any> {

    handleClick = () => {
        console.log("ComA: ", this.props)
        this.props.sendAction()
    }

    render () {
        return (
            <button onClick = {this.handleClick}> + </button>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendAction: () => {
            dispatch({
                type: 'add_action'
            });
        }
    };
};

export default connect(null, mapDispatchToProps)(ComA)