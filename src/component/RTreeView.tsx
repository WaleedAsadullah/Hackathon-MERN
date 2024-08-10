import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from 'react-router-dom'

export default function RTreeView(props : any) {
  const treeStructure = props.treeStructure
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        {
          treeStructure.map((module:any,moduleIndex:number)=>{
            return <TreeItem key={moduleIndex} itemId={moduleIndex.toString()} label={module.modelName} style={{paddingBottom:"8px"}} >
              {
                module.child.map((item:any,itemIndex:number)=>{
                  return <Link to={module.prefix+item.route} key={itemIndex} ><TreeItem itemId={itemIndex.toString()+moduleIndex.toString()} label={item.name} /></Link>
                })
              }
            </TreeItem>
          })
        }
      </SimpleTreeView>
    </Box>
  );
}
