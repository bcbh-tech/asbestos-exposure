import React, { Component } from 'react';

class ItemList extends Component {
    render () {
        let filteredAppData = this.props.filteredAppData;
        let fullList = filteredAppData.map((d) => <li className={d.visibility + " list-item"} key={d.id}><span className="list-item-left">{d.company}</span><span className="list-item-right">{d.city}, {d.state}</span></li>);
        let loadingAnimation = function() {
            let placeholiderList = [];
            for (let i = 0; i < 15; i++) {
                placeholiderList.push(<li key={i} className="visible list-item"><span className="list-item-left placeholder-text"></span><span className="list-item-right placeholder-text placeholder-right"></span></li>);
            }
            return placeholiderList;
        }
        let placeholderList = loadingAnimation();
        if (fullList.length !== 0 || this.props.listLoading) {
            return (
                <div>
                    <ul className="item-list" id="item-list">
                        {this.props.listLoading ? placeholderList : fullList}
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="item-list-empty" id="item-list-empty">
                        <p>Sorry, no results were found for "{this.props.searchQuery}"</p>
                        <p>Search suggestions</p>
                        <p>Check your spelling.</p>
                        <p>Try a more generic search.</p>
                        <p>Send us a message, we can help you find an exposure site location.</p>
                    </div>
                </div>
            );
        }
    }
}

export default ItemList;