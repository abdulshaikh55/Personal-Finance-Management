import styled from 'styled-components';
import bg from './img/bg.png';
import {MainLayout} from './styles/Layouts.js';
import Orb from './Components/Orb/Orb.js'
import Navigation from './Components/Navigation/Navigation.js';

function App() {
  return (
    <>
    <AppStyled bg={bg}>
      <Orb></Orb>
      <MainLayout>
        <Navigation/>
      </MainLayout>
    </AppStyled>
    </>
  );
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;
  `;

export default App;