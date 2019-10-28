import React, { Component } from "react";


class Fight extends Component {
    constructor(props) {
        super(props);
        this.callFighter = this.callFighter.bind(this);
        this.state = {
            fight: props.fight,
            firstFighter: undefined,
            secondFighter: undefined,
            firstFighterRecord: undefined,
            secondFighterRecord: undefined
    };
}

    callFighter() {
        fetch("http://192.168.99.100:9000/fighters/fighter/" + this.state.firstFighter)
            .then(res => res.json())
            .then(res => this.setState({ firstFighterRecord: res.results },
                function () {
                    console.log(this.state.firstFighterRecord);
                })
            )
            .catch(err => err);
        fetch("http://192.168.99.100:9000/fighters/fighter/" + this.state.secondFighter)
            .then(res => res.json())
            .then(res => this.setState({ secondFighterRecord: res.results },
                function () {
                    console.log(this.state.secondFighterRecord);
                })
            )
            .catch(err => err);
    }

    componentDidMount() {
        var firstFighter = null;
        var secondFighter = null;
        if (this.props.fight[1] !== undefined) {
            firstFighter = this.props.fight[1].replace(/\s\(.*/g, '');
        }
        if (this.props.fight[3] !== undefined) {
            secondFighter = this.props.fight[3].replace(/\s\(.*/g, '');
        }
        this.setState({firstFighter: firstFighter, secondFighter: secondFighter},
            function () {
                // this.callFighter();
                console.log(this.state.fight);
                console.log(this.state.firstFighter);
                console.log(this.state.secondFighter);
                this.callFighter();
            }
        );

    }



    render() {
        if (this.state.firstFighterRecord !== undefined && this.state.secondFighterRecord !== undefined) {
            var record1 = this.state.firstFighterRecord.record;
            var record2 = this.state.secondFighterRecord.record;
            var nationality1 = this.state.firstFighterRecord.nationality;
            var nationality2 = this.state.secondFighterRecord.nationality;
        }

        console.log(this.state.fight);

        return (
            <div>

                {(this.state.fight.length === 4 || this.state.fight.length === 5) &&
                    <div className="columns is-vcentered is-mobile is-gapless" style={{paddingBottom:15+'px'}}>
                        <div className="column is-1 big-text fightFont" style={{color:'black',fontFamily:'Nunito'}}>

                        </div>
                        <div className="column is-2 fightFont" style={{color:'black',fontFamily: 'Work Sans',position:'relative'}}>
                            {this.state.fight[1].split(" ", 2)[0]} <br />
                            {this.state.fight[1].split(" ", 2)[1]} {this.state.fight[1].split(" ", 3)[2]}
                            <div className={`flag-icon-background flag-icon-${nationality1}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                            </div>
                        </div>
                        <div className="column is-1 fightFont" style={{color:'black',fontFamily: 'Work Sans'}}>
                            &nbsp;{record1}&nbsp;
                        </div>
                        <div className="column is-4 big-text" style={{backgroundColor:'gray'}}>
                            <h1 className="" style={{fontSize:1+'em',color:'black',fontWeight:200}}>
                                {this.state.fight[0]}
                            </h1>
                        </div>
                        <div className="column is-1 big-text fightFont" style={{color:'black',fontFamily:'Nunito'}}>
                            &nbsp;{record2}&nbsp;
                        </div>
                        <div className="column is-2 big-text fightFont" style={{color:'black',fontFamily:'Nunito',position:'relative'}}>
                            {this.state.fight[3].split(" ", 2)[0]} <br />
                            {this.state.fight[3].split(" ", 2)[1]} {this.state.fight[3].split(" ", 3)[2]}
                            <div className={`flag-icon-background flag-icon-${nationality2}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                            </div>
                        </div>
                        <div className="column is-1 big-text fightFont" style={{color:'black',fontFamily:'Nunito'}}>

                        </div>
                    </div>
                }

                {(this.state.fight.length > 5) &&
                    <div className="columns is-vcentered is-mobile is-gapless" style={{paddingBottom:15+'px'}}>
                    <div className="column is-1 big-text fightFont" style={{color:'black',fontFamily:'Nunito'}}>

                    </div>
                    {(this.state.fight[2] === 2 || this.state.fight[2] === "2") &&
                        <div className="column is-2 fightFont" style={{color:'black',fontFamily: 'Work Sans',position:'relative'}}>
                            {this.state.fight[1].split(" ", 2)[0]} <br />
                            {this.state.fight[1].split(" ", 2)[1]} {this.state.fight[1].split(" ", 3)[2]}
                            <div className={`flag-icon-background flag-icon-${nationality1}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                            </div>
                        </div>
                    }
                    {(this.state.fight[2] === 2 || this.state.fight[2] === "2") &&
                        <div className="column is-1 fightFont" style={{backgroundColor:'#FF0000',color:'black',fontFamily: 'Work Sans'}}>
                            &nbsp;{record1}&nbsp;
                        </div>
                    }
                    {(this.state.fight[4].includes('Draw') || this.state.fight[4].includes('No Contest') || this.state.fight[4].includes('NC')) &&
                        <div className="column is-2 fightFont" style={{color:'black',fontFamily: 'Work Sans',position:'relative'}}>
                            {this.state.fight[1].split(" ", 2)[0]} <br />
                            {this.state.fight[1].split(" ", 2)[1]} {this.state.fight[1].split(" ", 3)[2]}
                            <div className={`flag-icon-background flag-icon-${nationality1}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                            </div>
                        </div>
                    }
                    {(this.state.fight[4].includes('Draw') || this.state.fight[4].includes('No Contest') || this.state.fight[4].includes('NC')) &&
                        <div className="column is-1 fightFont" style={{backgroundColor:'#D3D3D3',color:'black',fontFamily: 'Work Sans'}}>
                            &nbsp;{record1}&nbsp;
                        </div>
                    }
                    {(this.state.fight[2].includes("def")) &&
                        <div className="column is-2 fightFont" style={{color:'black',fontFamily: 'Work Sans',position:'relative'}}>
                            {this.state.fight[1].split(" ", 2)[0]} <br />
                            {this.state.fight[1].split(" ", 2)[1]} {this.state.fight[1].split(" ", 3)[2]}
                            <div className={`flag-icon-background flag-icon-${nationality1}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                            </div>
                        </div>
                    }
                    {(this.state.fight[2].includes("def")) &&
                        <div className="column is-1 fightFont" style={{backgroundColor:'#00FA96',color:'black',fontFamily: 'Work Sans'}}>
                            &nbsp;{record1}&nbsp;
                        </div>
                    }

                    <div className="column is-4 big-text">

                        <h1 className="" style={{fontSize:1+'em',color:'black',fontWeight:200}}>
                                {this.state.fight[4]}<br />
                                {this.state.fight[0]}<br />
                                {this.state.fight[6]} Round {this.state.fight[5]}
                        </h1>

                    </div>
                        {(this.state.fight[2] === 2 || this.state.fight[2] === "2") &&
                            <div className="column is-1 fightFont" style={{backgroundColor:'#00FA96',color:'black',fontFamily: 'Work Sans'}}>
                                &nbsp;{record2}&nbsp;
                            </div>
                        }
                        {(this.state.fight[2] === 2 || this.state.fight[2] === "2") &&
                            <div className="column is-2 fightFont" style={{color:'black',fontFamily: 'Work Sans',position:'relative'}}>
                                {this.state.fight[3].split(" ", 2)[0]} <br />
                                {this.state.fight[3].split(" ", 2)[1]} {this.state.fight[3].split(" ", 3)[2]}
                                <div className={`flag-icon-background flag-icon-${nationality2}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                                </div>
                            </div>
                        }
                        {(this.state.fight[4].includes('Draw') || this.state.fight[4].includes('No Contest') || this.state.fight[4].includes('NC')) &&
                            <div className="column is-1 fightFont" style={{backgroundColor:'#D3D3D3',color:'black',fontFamily: 'Work Sans'}}>
                                &nbsp;{record2}&nbsp;
                            </div>
                        }
                        {(this.state.fight[4].includes('Draw') || this.state.fight[4].includes('No Contest') || this.state.fight[4].includes('NC')) &&
                            <div className="column is-2 fightFont" style={{color:'black',fontFamily: 'Work Sans',position:'relative'}}>
                                {this.state.fight[3].split(" ", 2)[0]} <br />
                                {this.state.fight[3].split(" ", 2)[1]} {this.state.fight[3].split(" ", 3)[2]}
                                <div className={`flag-icon-background flag-icon-${nationality2}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                                </div>
                            </div>
                        }
                        {(this.state.fight[2].includes("def")) &&
                            <div className="column is-1 fightFont" style={{backgroundColor:'#FF0000',color:'black',fontFamily: 'Work Sans'}}>
                                &nbsp;{record2}&nbsp;
                            </div>
                        }
                        {(this.state.fight[2].includes("def")) &&
                            <div className="column is-2 fightFont" style={{color:'black',fontFamily: 'Work Sans',position:'relative'}}>
                                {this.state.fight[3].split(" ", 2)[0]} <br />
                                {this.state.fight[3].split(" ", 2)[1]} {this.state.fight[3].split(" ", 3)[2]}
                                <div className={`flag-icon-background flag-icon-${nationality2}`} style={{ zIndex:-1,opacity:0.2,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                                </div>
                            </div>
                        }
                        <div className="column is-1 big-text fightFont" style={{color:'black',fontFamily:'Nunito'}}>

                        </div>


                    </div>

                }




            </div>







        );
    }
}



export default Fight;
