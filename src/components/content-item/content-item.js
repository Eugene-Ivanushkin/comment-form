import React from 'react'

//@material
import { Grid, Box, Typography } from '@material-ui/core';

const ContentItem = ({ name, text }) => {
    return (
        <Box p={1} >
            <Grid container item xs style={{ paddingLeft: '5px' }}>
                <Grid item xs={12} >
                    <Typography variant='h6'>{name}</Typography>
                </Grid>
                <Grid item xs={12} style={{ borderBottom: '2px solid gray' }}>
                    <Typography>{text}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ContentItem;