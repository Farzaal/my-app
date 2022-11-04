import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as JSZip from 'jszip'

function App() {
  const [loading, setLoading] = React.useState(false);
  const [repository, setRepository] = React.useState([]);
  const [directory, setDirectory] = React.useState([]);

  useEffect(() => {
    fetch('https://dat20jvqpp4ts.cloudfront.net/63350e0ad191c206085c9326/e5aead5c-7dea-4d1f-84b5-adbe0fe09e05_1667542651488213949?Expires=-62135596800&Signature=VnwPYI42auy3Y~zA1XNOrPkHUZYGYrL7Nu4zV1hJJK3t27ImXpCI~hX9oiLSogeWetOXZnllZTvOt2JA3ay1GgPmxlOF-HB7Xk6QGequXaNfYm5LfjHX2zBmS16Eu8KAD0Q5tR3uApFasx6~swtsjmiQcGgYWF0Lr9tRZAZ6RoxQXkbBnY1NoPb9oT2-yt4uEyopkDpbejw7eFHyQvqN0ZQfTs8ZIPceO1Xc5zdRXhg7UPyEEzkshF~0zgtRQ~mkSq~PuELKYCLJ6eWwTg0OaUy97WdirZ0syH9BWS9N4nJBSuRBh89OwWVdsb3FG~1to2dzHyv7ln-BJp~3GWc~uQ__&Key-Pair-Id=K2EOYUP2MYY488/')
    .then((response) => response.blob())
    .then((blob) => {
      var zip = new JSZip();
      zip.loadAsync(blob).then(function (zip) {
        let result = [];
        let level = {result};
        const paths = []
        const folders = []
        Object.keys(zip.files).forEach(function (filename) {
          if (zip.files[filename].dir == true) {
            const splitDir = filename.split("/")
            folders.push(splitDir[splitDir.length-2])
          }
          paths.push(filename)
        })
        setDirectory(folders)
        paths.forEach(path => {
          path.split('/').reduce((r, name, i, a) => {
            if (name == "") {
              return
            }
            if (!r[name]) {
              if (r[name] == '') {
                return
              }
              r[name] = {result: []};
              r.result.push({name, values: r[name].result })
            }
            return r[name];
          }, level)
        })
        setRepository(result)
      })
    });
  }, [])

  const SelectedDirectory = (event, type) => {
    // console.log(type)
  };

  function ListTreeItem({ item }) {
    let children = null;
    if (item.values && item.values.length) {
      children = (
        <ul>
          {item.values.map(i => (
            <ListTreeItem item={i} key={i.name} />
          ))}
        </ul>
      );
    }
  
    return (
      <li onClick={event => SelectedDirectory(event, item.name)} style={{
        fontWeight: 'bold', 
        margin:'10px',
        listStyleType: 'lower-alpha'
      }}>
        {item.name}
        {children}
      </li>
    );
  }

  if (loading) {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{height: '80vh'}}>
        <CircularProgress color="primary" size={90} thickness={5.0} variant="indeterminate" />
        <Typography variant="h6" component="h6">
          Please Wait Downloading Repository
        </Typography>;
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
      <Box sx={{ overflowY: 'auto', border: '1px solid #ddd', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        User Github Repository
      </Typography>
          {repository.map(i => (
            <ListTreeItem item={i} key={i.name} />
          ))}
      </Box>
      </Grid>
      <Grid item xs={6}>
      <Box sx={{ overflowY: 'auto', border: '1px solid #ddd', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Locofy Components
      </Typography>
      </Box>
      </Grid>
    </Grid>
  );
}

export default App;
