import React   from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Profile from './Profile';
import {
  // rest of the elements/components imported remain same
  useParams
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Account = () => {
  const classes = useStyles();
  const { id } = useParams();
  console.log(id);
  // const userProfile = useState([]);

  //   useEffect(() => {
  //   fetch("http://139.59.80.134:8080/engine-rest/user/demo/profile"
  //     //    {
  //     //       "method": "GET",
  //     //     "headers": {
  //     //     // "content-type": "application/json",
  //     //     // "accept": "application/json"
  //     //   }
  //     // }
  //   )
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response);
  //       userProfile = response;
       
  //     })
  //     .catch(err => { console.log(err); });
  // })

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <Profile />
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid> */}
        </Grid>
      </Container>
     </Page>
  );
};

export default Account;
