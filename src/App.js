import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as JSZip from 'jszip'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Header } from './components/Header';
import { LocofyList } from './components/LocofyList';
import { InputPanel } from './components/InputPanel';
import { AlertDialog } from './components/AlertDialog';
import { v4 as uuidv4 } from 'uuid';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import {MonacoProvider, DiffEditor} from '@memsetzero/react-monaco-editor';

function App() {
  const [loading, setLoading] = React.useState(false);
  const [repository, setRepository] = React.useState([]);
  const [maxNodeId, setMaxNodeId] = React.useState(0);
  const [expanded, setExpanded] = React.useState(true);
  const [directory, setDirectory] = React.useState([]);
  const [repoLoaded, setRepoLoaded] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState('');

  const LoadRepositoryToTree = (url) => {
    if(!url) {
      setLoading(false)
      return
    }
    fetch(url)
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
        let nodeIdentifier = 0
        paths.forEach(path => {
          nodeIdentifier = nodeIdentifier+1
          path.split('/').reduce((r, name, i, a) => {
            if (name == "") {
              return
            }
            if (!r[name]) {
              if (r[name] == '') {
                return
              }
              r[name] = {result: []};
              r.result.push({
                name, id: uuidv4(), 
                children: r[name].result, 
                disabled: false
                // disabled: !folders.includes(name) ? true : false
              })
            }
            return r[name];
          }, level)
        })
        setMaxNodeId(nodeIdentifier)
        setRepository(result)
        setLoading(false)
      })
    }).catch(err => {
      setLoading(false)
      console.log('An error occurred while fetching github repository', err)
    });
  }

  const renderTree = (nodes) => {
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} disabled={nodes.disabled}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  }

  const moveComponent = () => {
    if (selectedComponent == 'Card') {
      setShowDialog(true)
      console.log(selectedComponent)
    }
  } 

  const handleClose = () => setShowDialog(!showDialog);

  const handleChange = (event, nodeId) => {};

  const GithubCloneRepoApiCall = async (data) => {
    try {
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch('https://mc0isynw3j.execute-api.ap-southeast-1.amazonaws.com/v1/github_directory', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "user_name": "Farzaal",
          "github_token": "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", // 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
          "repo_name": "Farzaal/hospicare_admin", //hospicare_admin
          "branch": "master"
        })
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        LoadRepositoryToTree(data.download_url)
      });
    } catch(err) {
      setLoading(false)
      console.log("ERROR :: ", err)
    }
  };

  return (
    <div>
      <MonacoProvider theme="vs-dark">
        <Editor 
          style={{width: "100%", height: "600px"}}
          value="Hello, Monaco World!"
          options={{
            lineNumbers: false
          }}
        />
      </MonacoProvider>
      </div>
  );
}

export default App;
