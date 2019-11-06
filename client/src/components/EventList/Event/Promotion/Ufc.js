import React, { Component } from "react";



class Ufc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDetails: undefined
        };
    }


    componentDidMount() {
        const eventDetails = this.props.eventDetails;
        this.setState({ eventDetails: eventDetails });
    }


    componentDidUpdate(oldProps) {
        const eventDetails = this.props.eventDetails;

        if (oldProps.eventDetails !== eventDetails) {
            this.setState({ eventDetails: eventDetails });
        }

    }

    render() {


        return (
            <div className="column height big-text is-two-fifths ufcBackground">

                {this.props.eventDetails.location !== undefined && this.props.eventDetails.location.name && this.props.eventDetails.location.city && this.props.eventDetails.location.provState && this.props.eventDetails.location.country &&
                  <h2 className="mobileLocation eventElementTop">
                    {this.props.eventDetails.location.name}, {this.props.eventDetails.location.city}, {this.props.eventDetails.location.provState}, {this.props.eventDetails.location.country}
                  </h2>
                }
                {this.props.eventDetails.location !== undefined && this.props.eventDetails.location.name && this.props.eventDetails.location.city && !this.props.eventDetails.location.provState && this.props.eventDetails.location.country &&
                  <h2 className="mobileLocation eventElementTop">
                    {this.props.eventDetails.location.name}, {this.props.eventDetails.location.city}, {this.props.eventDetails.location.country}
                  </h2>
                }
                {this.props.eventDetails.location === undefined &&
                  <h2 className="mobileLocation eventElementTop">
                    NO LOCATION
                  </h2>
                }
                <div className="verticalAlign" style={{}}>
                    <h1 className="eventTitle">
                        {(this.props.eventDetails.event === this.props.eventDetails.otherName || this.props.eventDetails.otherName === undefined) &&
                            <div className="lineSize">{this.props.eventDetails.name}</div>
                        }
                        {(this.props.eventDetails.event !== this.props.eventDetails.otherName && this.props.eventDetails.otherName !== undefined) &&
                            <div className="lineSize">{this.props.eventDetails.otherName}</div>
                        }
                    </h1>
                </div>
                <div className="eventElementBottom lineSize">{this.props.eventDetails.title}</div>
            </div>
        );
    }
}



export default Ufc;
