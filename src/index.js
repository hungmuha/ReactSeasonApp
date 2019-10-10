import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

// function component
// const App = () =>{
//     return <div>Hi there!</div>;
// };

// class base component
class App extends React.Component {
    // constructor(props) {
    //     //refer to parent React.Component since we dont want to overwrite the constructor of the parent
    //     super(props);

    //     //this is THE ONLY TIME we do direct assignment to this.state
    //     this.state = { lat: null, errorMessage: '' };
    // }

    //this alternative way to initiate state, via babeljs, which convert this way back to how it was 
    state = { lat: null, errorMessage: '' };

    //only loaded once when the component mount,
    //it is recommended to use this function to load data from API
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            //we called setState to update the state!!!
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message})
        );
    }

    renderContent (){
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>
        }

        return <Spinner message= "Please accept the location request"/>
    }

    //React says we have to define render!!
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render (
    <App/>,
    document.querySelector("#root")
)