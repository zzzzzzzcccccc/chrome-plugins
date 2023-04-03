import React from 'react';
import Setting from '../setting';
import { Grid, Box } from '@mui/material';
import { cards } from '../../model/card-model';

export default function App() {
  return (
    <>
      <Setting />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {cards.map((card, index) => {
            const { render, ...props } = card;
            return (
              <Grid key={index} {...props}>
                {render()}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
