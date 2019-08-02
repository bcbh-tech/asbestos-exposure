import React, { Component } from 'react';

class ItemList extends Component {
    render () {
        
        let filteredAppData = this.props.filteredAppData;
        let fullList = filteredAppData.map((d) => <li className={d.visibility + " list-item"} key={d.id}><span className="list-item-left">{d.company}</span><span className="list-item-right">{d.city}, {d.state}</span></li>);
        
        return (
            <ul className="item-list" id="item-list">
              {fullList}
            </ul>
        );
    }
}

export default ItemList;