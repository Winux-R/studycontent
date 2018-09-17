import React from 'react';
import PropTypes from 'prop-types';
import VoteHeader from "./VoteHeader";
import VoteBody from "./VoteBody";
import VoteFooter from "./VoteFooter";

import {Provider} from 'react-redux';
import store from '../redux/index';

export default class Vote extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let styleOBJ = {
            width: '60%',
            margin: '20px auto'
        };

        return <Provider store={store}>
            <section style={styleOBJ} className='panel panel-default'>
                <VoteHeader/>
                <VoteBody/>
                <VoteFooter/>
            </section>
        </Provider>;
    }
}











