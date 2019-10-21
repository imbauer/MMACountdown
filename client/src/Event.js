import React, { Component } from "react";
import Moment from 'react-moment';
import mom from 'moment';
import 'moment-timezone';





class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat, timezone} = this.props;
            const then = mom.tz(timeTillDate, timeFormat, timezone)

            then.utc();
            const now = mom().tz(timezone)
            now.utc();
            const countdown = then - now;
            const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
            const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
            // const days = countdown.format('D');
            // const hours = countdown.format('HH');
            // const minutes = countdown.format('mm');
            // const seconds = countdown.format('ss');

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;

        // Mapping the date values to radius values
        const daysRadius = mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        return (
            <div className="columns is-multiline is-mobile verticalAlign" style={{margin:0}}>
                {days && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={daysRadius} />
                        {days}
                        <span>days</span>
                    </div>
                )}
                {hours && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={hoursRadius} />
                        {hours}
                        <span>hours</span>
                    </div>
                )}
                {minutes && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={minutesRadius} />
                        {minutes}
                        <span>minutes</span>
                    </div>
                )}
                {seconds && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={secondsRadius} />
                        {seconds}
                        <span>seconds</span>
                    </div>
                )}
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            stroke-width="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}






class Event extends Component {
    constructor(props) {
        super(props);
        this.changeTimezone = this.changeTimezone.bind(this);
        this.getCountDown = this.getCountDown.bind(this);
        this.state = {
            timeObject: props.result.when.monthString.substring(0, 3) + ' ' + props.result.when.weekDay.substring(0, 3) + ' ' + props.result.when.day  + ' ' +
            props.result.when.year + ' ' + props.result.when.hour + ':' + props.result.when.minute + ':00 ' + ' ' + props.result.when.offset,
            selectValue: props.selectValue,
            countDown: props.result.when.day
        };
    }

    // getCountDown(month, day, year, hour, minute, second) {
    getCountDown() {

    }

    changeTimezone() {
        console.log(this.state.selectValue);
        var time = mom(new Date(this.state.timeObject.split(':00 ')[0])).format('YYYY-MM-DD HH:mm');
        var offset = this.state.timeObject.split(':00 ')[1].trim();
        console.log(time);
        console.log(offset);
        var currentTime = mom.tz(time.toString(), offset);
        var differentTime = currentTime.clone().tz(this.state.selectValue);
        console.log(currentTime);
        console.log(differentTime);
        console.log('New Region: ' + this.state.selectValue);
        this.setState({ timeObject: differentTime.toString().replace(/GMT.*/g, this.state.selectValue) })
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.selectValue !== newProps.selectValue) {
            this.setState({ selectValue: newProps.selectValue },
            function() {
                this.changeTimezone();
            });
        }
        if(oldProps.result.when.monthString !== newProps.result.when.monthString || oldProps.result.when.hour !== newProps.result.when.hour || oldProps.result.when.year !== newProps.result.when.year || oldProps.result.when.day !== newProps.result.when.day) {
            this.setState({ timeObject: newProps.result.when.monthString.substring(0, 3) + ' ' + newProps.result.when.weekDay.substring(0, 3) + ' ' + newProps.result.when.day +
            ' ' + newProps.result.when.year + ' ' + newProps.result.when.hour + ':' + newProps.result.when.minute + ':00 ' + ' ' + newProps.result.when.offset});
            this.setState({ countDown: newProps.result.when.day },
            function() {

                console.log(this.state.countDown);
            });
        }
    }

    render() {
        var dDate = this.state.timeObject.replace(/:00 .*/g, '');
        var timezone = this.state.timeObject.replace(/.*:00 /g, '');
        var ufcImage=require('./ufcLogo30.png')
        return (
            <div className="columns height is-vcentered work__list-item is-mobile" style={{ textAlign:'center',position: 'relative',marginTop:1+'px',marginBottom:1+'px' }}>

                <div className="column height countdown-wrapper" style={{ fontSize:1.7+'em',textAlign:'center' }}>

                    <Countdown timeTillDate={dDate} timeFormat="ddd MMM DD YYYY HH:mm" timezone={timezone} />

                </div>


                <div className="column height big-text is-two-fifths" style={{ backgroundSize:30+'%',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundImage:'url(' + ufcImage + ')' }}>
                    <div className="verticalAlign">
                    {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && this.props.result.location.provState && this.props.result.location.country &&
                      <h2>
                        {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.provState}, {this.props.result.location.country}
                      </h2>
                    }
                    {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && !this.props.result.location.provState && this.props.result.location.country &&
                      <h2>
                        {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.country}
                      </h2>
                    }
                    {this.props.result.location === undefined &&
                      <h2>
                        NO LOCATION
                      </h2>
                    }

                    <h1 className="eventTitle" style={{ marginBottom:5+'%',marginTop:5+'%' }}>
                            {this.props.result.event}
                    </h1>
                    <div>{this.props.result.title}</div>
                    </div>
                </div>

                {this.props.result.location !== undefined &&
                    <div className={`column height clockRight flagRotate clockP time flag-icon-background flag-icon-${this.props.result.location.co}`} style={{ backgroundSize:'cover',fontSize:1.7+'em',zIndex:2,fontWeight:600 }}>
                        <div className="verticalAlign textRotate">
                            {this.state.timeObject}
                        </div>
                    </div>
                }
                {this.props.result.location === undefined &&
                    <div className="column height clockDiv" style={{ fontSize:1.7+'em',textAlign:'center' }}>
                        PlaceHolder
                    </div>
                }



            </div>
        )
    }
}


export default Event;
