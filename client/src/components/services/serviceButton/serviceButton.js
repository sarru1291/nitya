import React from 'react'
import './serviceButton.scss';
export default function ServiceButton(props) {
    return (
      <>
        <div className="s-btn" onClick={() => { props.s_btn_action(props.id) }}>
          <div>{props.children}</div>
          <div> {props.name}</div>
        </div>
      </>
    );
}
