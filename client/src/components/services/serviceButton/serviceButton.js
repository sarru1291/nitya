import React from 'react'
import './serviceButton.scss';
export default function ServiceButton(props) {
    return (
      <>
        <div className="s-btn">
          <div>{props.children}</div>
          <div> {props.name}</div>
        </div>
      </>
    );
}
