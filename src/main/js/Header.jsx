import React, {useState} from 'react';
import Create from './Modals/Create.jsx'
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        paddingBottom: 20,
    },
    text: {
        color: '#ffffff',
    },
    header: {
        background: '#1D4ED8',
    }
});

const Header = ( {attributes, onCreate}) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.root} xs={12}>
            <AppBar position={'static'}>
                <Toolbar className={classes.header} >
                    <Create attributes={attributes} onCreate={onCreate}/>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default Header;
