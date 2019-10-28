import React, { Component } from "react";
import { EventList } from './components'
import "./App.css";
import globe from './images/globeresize.png';
import clock from './images/clockwhiteoutline.png';
import arrows from './images/arrows2.png';

class App extends Component {
    constructor(props) {
        super(props);
        this.initTimezone = this.initTimezone.bind(this);
        this.stateChange = this.stateChange.bind(this);
        this.change = this.change.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.callUpcoming = this.callUpcoming.bind(this);
        this.callUpcomingUFC = this.callUpcomingUFC.bind(this);
        this.callUpcomingBellator = this.callUpcomingBellator.bind(this);
        this.callPast = this.callPast.bind(this);
        this.callPastUFC = this.callPastUFC.bind(this);
        this.callPastBellator = this.callPastBellator.bind(this);
        this.callNothing = this.callNothing.bind(this);
        this.state = {
            value: "",
            ufc: true,
            bellator: false,
            radio1: "upcoming",
            dbResponse: undefined
        };
    }



    stateChange() {
        this.setState({ dbResponse: [{name:'HEY', title:'YOU'}] })
    }



    initTimezone() {
        this.setState({value: 'US/Eastern'});
    }

    callUpcoming() {
        fetch("http://192.168.99.100:9000/promotions/upcoming")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }
    callUpcomingUFC() {
        fetch("http://192.168.99.100:9000/promotions/upcoming/ufc")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }
    callUpcomingBellator() {
        fetch("http://192.168.99.100:9000/promotions/upcoming/bellator")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }

    callPast() {
        fetch("http://192.168.99.100:9000/promotions/past")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }
    callPastUFC() {
        fetch("http://192.168.99.100:9000/promotions/past/ufc")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }
    callPastBellator() {
        fetch("http://192.168.99.100:9000/promotions/past/bellator")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }
    callNothing() {
        this.setState({ dbResponse: [] })
    }

    onCheckChange(e) {
        console.log(e.target.checked, e.target.name);
        this.setState({
            [e.target.name]: e.target.checked
        },
        function() {
            console.log('radio1 ' + this.state.radio1);
            console.log('ufc ' + this.state.ufc);
            console.log('bellator ' + this.state.bellator);
            if (this.state.ufc === true && this.state.bellator === true && this.state.radio1 === "upcoming") {
                this.callUpcoming();
            }
            else if (this.state.ufc === true && this.state.bellator !== true && this.state.radio1 === "upcoming") {
                this.callUpcomingUFC();
            }
            else if (this.state.ufc !== true && this.state.bellator === true && this.state.radio1 === "upcoming") {
                this.callUpcomingBellator();
            }
            else if (this.state.ufc === true && this.state.bellator === true && this.state.radio1 === "past") {
                this.callPast();
            }
            else if (this.state.ufc === true && this.state.bellator !== true && this.state.radio1 === "past") {
                this.callPastUFC();
            }
            else if (this.state.ufc !== true && this.state.bellator === true && this.state.radio1 === "past") {
                this.callPastBellator();
            }
            else if (this.state.ufc !== true && this.state.bellator !== true) {
                this.callNothing();
            }
        });
    }

    onRadioChange(e) {
        console.log(e.target.checked, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        },
        function() {
            console.log('radio1 ' + this.state.radio1);
            console.log('ufc ' + this.state.ufc);
            console.log('bellator ' + this.state.bellator);
            if (this.state.ufc === true && this.state.bellator === true && this.state.radio1 === "upcoming") {
                this.callUpcoming();
            }
            else if (this.state.ufc === true && this.state.bellator !== true && this.state.radio1 === "upcoming") {
                this.callUpcomingUFC();
            }
            else if (this.state.ufc !== true && this.state.bellator === true && this.state.radio1 === "upcoming") {
                this.callUpcomingBellator();
            }
            else if (this.state.ufc === true && this.state.bellator === true && this.state.radio1 === "past") {
                this.callPast();
            }
            else if (this.state.ufc === true && this.state.bellator !== true && this.state.radio1 === "past") {
                this.callPastUFC();
            }
            else if (this.state.ufc !== true && this.state.bellator === true && this.state.radio1 === "past") {
                this.callPastBellator();
            }
            else if (this.state.ufc !== true && this.state.bellator !== true) {
                this.callNothing();
            }
        });
    }

    change(event){
        this.setState({value: event.target.value});
    }

    componentDidMount() {
        this.callUpcomingUFC();
        this.initTimezone();
    }

    render() {
        return (
            <div className="App">



                <div>



                    <div className="columns is-vcentered is-mobile is-gapless" style={{textAlign:'center',position:'relative',backgroundColor:'#282c34',paddingTop:20+'px'}}>

                        <div className="column" style={{width:30+'%'}}>
                            <div className="seperator">
                                <img className="imageSize" src={globe} alt={"globe"} />
                                <h2 className="subtitle has-text-light big-text" style={{color:'white'}}>Filter below based on preferred organizations</h2>
                            </div>
                        </div>


                        <div className="column is-two-fifths" style={{width:40+'%'}}>
                            <div className="seperator">
                                <img className="imageSize" src={clock} alt={"clock"} />
                                <h2 className="subtitle has-text-light big-text" style={{color:'white'}}>Choose your timezone to display events according to local time</h2>
                            </div>
                        </div>

                        <div className="column" style={{width:30+'%'}}>
                            <div className="seperator">
                                <img className="imageSize" src={arrows} alt={"arrows"} />
                                <h2 className="subtitle has-text-light big-text" style={{color:'white'}}>View either upcoming events or past events</h2>
                            </div>
                        </div>

                    </div>

                </div>




                <div className="columns is-vcentered is-mobile is-gapless" style={{textAlign:'center',position:'relative',backgroundColor:'#282c34',paddingBottom:20+'px'}}>

                    <div className="column" style={{width:30+'%'}}>
                        <div className="seperator">
                            <div className="containerCheckBoxes verticalAlign">
                                <ul className="ks-cboxtags">
                                    <li><input type="checkbox" name="ufc" id="checkboxOne" checked={this.state.ufc} onChange={this.onCheckChange} /><label htmlFor="checkboxOne">UFC</label></li>
                                    <li><input type="checkbox" name="bellator" id="checkboxTwo" checked={this.state.bellator} onChange={this.onCheckChange} /><label htmlFor="checkboxTwo">Bellator</label></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="column is-two-fifths" style={{width:40+'%'}}>
                        <div className="seperator">
                            <div className="map big-text styled" style={{ fontSize:1.7+'em',zIndex:2 }}>

                                <select id="timeZones" onChange={this.change} value={this.state.value} style={{ color:'white' }}>
                                    <option value="Etc/GMT+12">(GMT-12:00) International Date Line West</option>
                                    <option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option>
                                    <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                                    <option value="US/Alaska">(GMT-09:00) Alaska</option>
                                    <option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</option>
                                    <option value="America/Tijuana">(GMT-08:00) Tijuana, Baja California</option>
                                    <option value="US/Arizona">(GMT-07:00) Arizona</option>
                                    <option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                                    <option value="US/Mountain">(GMT-07:00) Mountain Time (US & Canada)</option>
                                    <option value="America/Managua">(GMT-06:00) Central America</option>
                                    <option value="US/Central">(GMT-06:00) Central Time (US & Canada)</option>
                                    <option value="America/Mexico_City">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                                    <option value="Canada/Saskatchewan">(GMT-06:00) Saskatchewan</option>
                                    <option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                                    <option value="US/Eastern">(GMT-05:00) Eastern Time (US & Canada)</option>
                                    <option value="US/East-Indiana">(GMT-05:00) Indiana (East)</option>
                                    <option value="Canada/Atlantic">(GMT-04:00) Atlantic Time (Canada)</option>
                                    <option value="America/Caracas">(GMT-04:00) Caracas, La Paz</option>
                                    <option value="America/Manaus">(GMT-04:00) Manaus</option>
                                    <option value="America/Santiago">(GMT-04:00) Santiago</option>
                                    <option value="Canada/Newfoundland">(GMT-03:30) Newfoundland</option>
                                    <option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option>
                                    <option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires, Georgetown</option>
                                    <option value="America/Godthab">(GMT-03:00) Greenland</option>
                                    <option value="America/Montevideo">(GMT-03:00) Montevideo</option>
                                    <option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option>
                                    <option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option>
                                    <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                                    <option value="Africa/Casablanca">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                                    <option value="Etc/Greenwich">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                                    <option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                    <option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                    <option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                                    <option value="Europe/Sarajevo">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                                    <option value="Africa/Lagos">(GMT+01:00) West Central Africa</option>
                                    <option value="Asia/Amman">(GMT+02:00) Amman</option>
                                    <option value="Europe/Athens">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                                    <option value="Asia/Beirut">(GMT+02:00) Beirut</option>
                                    <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                                    <option value="Africa/Harare">(GMT+02:00) Harare, Pretoria</option>
                                    <option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                                    <option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</option>
                                    <option value="Europe/Minsk">(GMT+02:00) Minsk</option>
                                    <option value="Africa/Windhoek">(GMT+02:00) Windhoek</option>
                                    <option value="Asia/Kuwait">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                                    <option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                                    <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
                                    <option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</option>
                                    <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                                    <option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</option>
                                    <option value="Asia/Baku">(GMT+04:00) Baku</option>
                                    <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                                    <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                                    <option value="Asia/Yekaterinburg">(GMT+05:00) Yekaterinburg</option>
                                    <option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                                    <option value="Asia/Calcutta">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                    <option value="Asia/Calcutta">(GMT+05:30) Sri Jayawardenapura</option>
                                    <option value="Asia/Katmandu">(GMT+05:45) Kathmandu</option>
                                    <option value="Asia/Almaty">(GMT+06:00) Almaty, Novosibirsk</option>
                                    <option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option>
                                    <option value="Asia/Rangoon">(GMT+06:30) Yangon (Rangoon)</option>
                                    <option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                    <option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                                    <option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                                    <option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur, Singapore</option>
                                    <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                                    <option value="Australia/Perth">(GMT+08:00) Perth</option>
                                    <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                                    <option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                                    <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                                    <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                                    <option value="Australia/Adelaide">(GMT+09:30) Adelaide</option>
                                    <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                                    <option value="Australia/Brisbane">(GMT+10:00) Brisbane</option>
                                    <option value="Australia/Canberra">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                                    <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                                    <option value="Pacific/Guam">(GMT+10:00) Guam, Port Moresby</option>
                                    <option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option>
                                    <option value="Asia/Magadan">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                                    <option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option>
                                    <option value="Pacific/Fiji">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                                    <option value="Pacific/Tongatapu">(GMT+13:00) Nuku'alofa</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="column" style={{width:30+'%'}}>
                        <div className="seperator">
                            <form className="verticalAlign">
                                <div className="radio-group">
                                    <input type="radio" id="when-one" checked={this.state.radio1 === "upcoming"} onChange={this.onRadioChange} name="radio1" value="upcoming" /><label className="timeLabel" htmlFor="when-one">UPCOMING</label><input type="radio" id="when-two" name="radio1" value="past" checked={this.state.radio1 === "past"} onChange={this.onRadioChange} /><label className="timeLabel" htmlFor="when-two">PAST</label>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>






                {this.state.dbResponse !== undefined &&
                    <EventList events={this.state.dbResponse} selectValue={this.state.value} />
                }

            </div>
        );
    }
}

export default App;
