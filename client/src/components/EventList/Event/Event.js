import React, { Component } from "react";
import mom from 'moment';
import 'moment-timezone';

import Countdown from './Countdown/Countdown'
import FightList from './FightList/FightList'
import Ufc from './Promotion/Ufc'
import Bellator from './Promotion/Bellator'


class Event extends Component {
    constructor(props) {
        super(props);
        this.changeTimezone = this.changeTimezone.bind(this);
        this.changeHiddenDiv = this.changeHiddenDiv.bind(this);
        this.state = {
            result: undefined,
            eventDate: undefined,
            selectValue: undefined,
            hidden: undefined
        };
    }


    changeTimezone() {
        var time = mom(new Date(this.state.eventDate.split(':00 ')[0])).format('YYYY-MM-DD HH:mm');
        var offset = this.state.eventDate.split(':00 ')[1].trim();
        var currentTime = mom.tz(time.toString(), offset);
        var differentTime = currentTime.clone().tz(this.state.selectValue);
        this.setState({ eventDate: differentTime.toString().replace(/GMT.*/g, this.state.selectValue) })
    }

    changeHiddenDiv() {
        this.setState({ hidden: !this.state.hidden });
    }



    componentDidMount() {
        const eventDate = this.props.result.when.weekDay.substring(0, 3) + ' ' + this.props.result.when.monthString.substring(0, 3) + ' ' + this.props.result.when.day +
        ' ' + this.props.result.when.year + ' ' + this.props.result.when.hour + ':' + this.props.result.when.minute + ':00 ' + ' ' + this.props.result.when.offset;
        const selectValue = this.props.selectValue;
        this.setState({ selectValue: selectValue },
        function() {
            this.changeTimezone();
        });
        this.setState({ eventDate: eventDate},
        function() {
            this.changeTimezone();
        });
        this.setState({ hidden: true });
    }


    componentDidUpdate(oldProps) {
        const eventDate = this.props.result.when.weekDay.substring(0, 3) + ' ' + this.props.result.when.monthString.substring(0, 3) + ' ' + this.props.result.when.day +
        ' ' + this.props.result.when.year + ' ' + this.props.result.when.hour + ':' + this.props.result.when.minute + ':00 ' + ' ' + this.props.result.when.offset;
        const selectValue = this.props.selectValue;
        const result = this.props.result;


        if (oldProps.selectValue !== selectValue) {
            this.setState({ selectValue: selectValue },
            function() {
                this.changeTimezone();
            });
        }

        if(oldProps.result !== result) {
            this.setState({ eventDate: this.props.result.when.weekDay.substring(0, 3) + ' ' + this.props.result.when.monthString.substring(0, 3) + ' ' + this.props.result.when.day +
            ' ' + this.props.result.when.year + ' ' + this.props.result.when.hour + ':' + this.props.result.when.minute + ':00 ' + ' ' + this.props.result.when.offset},
            function() {
                this.changeTimezone();
            });
            this.setState({ hidden: true });
        }

    }

    // componentWillUnmount() {
    //     this.setState({hidden: true});
    // }

    render() {
        if (this.state.eventDate !== undefined) {
            var dDate = this.state.eventDate.replace(/:00 .*/g, '');
            var timezone = this.state.eventDate.replace(/.*:00 /g, '');
        }
        return (
            <div>
                <div className="columns height is-vcentered work__list-item is-mobile is-gapless" onClick={this.changeHiddenDiv} style={{ textAlign:'center',position: 'relative',marginTop:1+'px',marginBottom:1+'px' }}>

                    <div className="column height countdown-wrapper" style={{ fontSize:1.7+'em',textAlign:'center' }}>
                        {this.state.eventDate !== undefined &&
                            <Countdown timeTillDate={dDate} timeFormat="ddd MMM DD YYYY HH:mm" timezone={timezone} />
                        }
                    </div>

                    {this.props.result.promotion === "Ultimate Fighting Championship" &&
                        <Ufc eventDetails={this.props.result} />
                    }
                    {this.props.result.promotion === "Bellator" &&
                        <Bellator eventDetails={this.props.result} />
                    }

                    {this.props.result.location !== undefined &&
                        <div className="column height">
                            <div className="verticalAlign textRotate inner">
                                {this.state.eventDate}
                            </div>
                            <div className={`flag-icon-background flag-icon-${this.props.result.location.co}`} style={{ zIndex:-1,opacity:0.4,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                            </div>
                        </div>
                    }
                    {this.props.result.location === undefined &&
                        <div className="column height clockDiv" style={{ fontSize:1.7+'em',textAlign:'center' }}>
                            PlaceHolder
                        </div>
                    }

                </div>


                {this.state.hidden === false &&
                    <FightList fights={this.props.result.fightCard} />
                }


            </div>
        )
    }
}


export default Event;
