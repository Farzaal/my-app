import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function InputPanel(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [githubDetails, SetGithubDetails] = React.useState({});
  const [showAlert, SetShowAlert] = React.useState(false);
  const [raisePR, SetRaisePR] = React.useState(false);

  const { GithubCloneRepoApiCall } = props

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onChange = (event) => {
    SetGithubDetails({
        ...githubDetails,
        [event.target.name]: event.target.value
     })
  }

  const OnButtonClick = (event) => {
    // SetShowAlert(false)
    // if ((!githubDetails?.user_name || githubDetails?.user_name == '') || 
    //     (!githubDetails?.github_token || githubDetails?.github_token == '') || 
    //     (!githubDetails?.repo_name || githubDetails?.repo_name == '')
    // ) {
    //     SetShowAlert(true)
    //     return
    // }
    // SetShowAlert(false)
    GithubCloneRepoApiCall({ ...githubDetails })
    // SetGithubDetails({})
  }

  const OnCheckboxChange = (event) => {
    SetRaisePR(event.target.checked)
  }

  return (
    <div style={{ margin: '40px' }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Github Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column">
                { showAlert ? <Alert severity="error">PLease fill the required fields!</Alert> : ''}
                <TextField onChange={onChange} name="user_name" error={false} id="standard-basic" label="Github Username" variant="standard" />
                <TextField onChange={onChange} name="github_token" error={false} id="standard-basic" label="Github Token" variant="standard" />
                <TextField onChange={onChange} name="repo_name" error={false} id="standard-basic" label="Repository name" variant="standard" />
                <TextField onChange={onChange} name="base_branch" error={false} id="standard-basic" label="Base Branch" variant="standard" />
                <TextField onChange={onChange} name="base_branch" error={false} id="standard-basic" label="Commit Branch" variant="standard" />
          </Grid>
        </AccordionDetails>
        {/* <FormControlLabel control={<Checkbox checked={raisePR} onChange={OnCheckboxChange} />} label="Raise PR" style={{ marginLeft: '5px' }} /> */}
        <Button variant="contained" style={{ margin: '10px' }} onClick={OnButtonClick}>Submit</Button>
      </Accordion>
    </div>
  );
}
