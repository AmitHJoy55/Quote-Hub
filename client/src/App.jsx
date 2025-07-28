import { Footer } from './sections';
import Nav from './Components/Nav';
import Home from './Pages/Home';


const App = () => (
  <div className="h-screen flex flex-col justify-between bg-lime-50">
    <section> <Nav /> </section>
    <section> <Home /> </section>
    {/* Add other sections here as needed */}
    <section className='mt-20'> <Footer/> </section>
  </div>
);

export default App;