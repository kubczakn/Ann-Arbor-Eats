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
            <div style={{position: "sticky", top: 0}}>
                <AppBar position={"static"}>
                    <Toolbar className={classes.header} >
                        <Typography className={classes.text}>Ann Arbor Eats</Typography>
                        {/*<Create attributes={attributes} onCreate={onCreate}/>*/}
                    </Toolbar>
                </AppBar>
            </div>

        </Grid>
    );
}

export default Header;
