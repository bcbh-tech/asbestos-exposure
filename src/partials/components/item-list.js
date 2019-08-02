import React, { Component } from 'react';

class ItemList extends Component {
    render () {
        
        let filteredAppData = this.props.filteredAppData;
        let fullList = filteredAppData.map((d) => <li className={d.visibility + " list-item"} key={d.id}>{d.company} - {d.city}, {d.state}</li>);
        
        return (
            <ul className="item-list">
              {fullList}
            </ul>
        );
    }
}

export default ItemList;