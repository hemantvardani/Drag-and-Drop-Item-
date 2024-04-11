import './App.css';
import Grid from '@mui/material/Grid';
import { FolderTree } from './src/Components/FolderTree';
import { ItemsList } from './src/Components/ItemsList';
import { Header } from './src/Layouts/Header';
import { BASE_COLOR } from './src/misc/colors';

function App() {
  return (<>
  <div style={{background:BASE_COLOR}}>

  <Header/>
    <Grid  container spacing={3} width={'100%'} >
      <Grid item={true} width={'40%'}>
    <FolderTree />
        </Grid>
        <Grid item={true} width={'60%'}>
    <ItemsList />
        </Grid>
    </Grid>
  </div>
  </>
   
 
  );
}

export default App;
