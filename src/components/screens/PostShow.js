import React from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';
class PostShow extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>;
        }
        return (
        <div>
            <video ref={this.videoRef} style={{width: '100%'}} controls/>
            <h1>{this.props.stream.title}</h1>
            <h5>{this.props.stream.description}</h5>
        </div>
    );}
};
const mapStateToProps=(state, ownProps)=>{
    
    return {stream: state.streams[ownProps.match.params.id]};
}
export default connect(mapStateToProps, {fetchPost})(PostShow);
