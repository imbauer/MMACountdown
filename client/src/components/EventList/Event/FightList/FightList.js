import React, { Component } from "react";

import Fight from './Fight/Fight'

function FightList(props) {
    let fights = props.fights.map((fight) => {
        return (
            <Fight fight={fight} />
        );
    })
    return (
        <div>
            {fights}
        </div>
    )
}



export default FightList;
