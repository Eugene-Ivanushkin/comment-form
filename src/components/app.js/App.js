import { Typography } from '@material-ui/core';
import React from 'react'

//components
import Content from '../content'
import Form from '../form'

const App = () => {

  return (
    <>
      <Typography variant='h2'>
        Web Home test assignment
      </Typography>
      <Form />
      <Content />
    </>
  );
}

export default App;
