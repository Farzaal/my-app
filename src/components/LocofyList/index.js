import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';

export function LocofyList(props) {
  const [open, setOpen] = React.useState(false);
  const [style, setStyle] = React.useState({});
  const [conflict, setConflict] = React.useState(false);

  const handleOpen = (expandedText) => {
    setOpen(!open);
    if (!open == true) {
      if(expandedText == 'Card') {
        setConflict(true)
      }
      setStyle({ backgroundColor: 'black', color: 'white' })
    } else {
      setStyle({ backgroundColor: 'white' })
    }
    props.setSelectedComponent(expandedText)
  }

  return (
    <List
      sx={{ width: '90%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={() => handleOpen(props.expandedText)} style={style}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={props.expandedText} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          { props.items.map((item, index) => 
              <ListItemButton 
                sx={{ pl: 4 }} 
                key={index}>
                <InsertDriveFileTwoToneIcon />
                <ListItemText primary={item} style={{ marginLeft: '20px' }} />
              </ListItemButton>
            )  
          }
        </List>
      </Collapse>
    </List>
  );
}
