import React, {useState} from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    footer: {
        background: '#1D4ED8',
        // background: '#bdbdbd',
        minHeight: 45
    },
    text: {
        color: '#ffffff',
    },
    icon: {
        paddingRight: 4
    }
});

const Footer = ( ) => {
    const classes = useStyles();

    return (
        <Grid item  xs={12}>
            <AppBar position={"static"}>
                <Toolbar className={classes.footer} >
                    <CopyrightIcon className={classes.icon} />
                    <Typography className={classes.text}>
                       Nathan Kubczak 2021
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grid>

    );
}

export default Footer;
