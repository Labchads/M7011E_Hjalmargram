import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

const Layout = ({children}) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default connect()(Layout);