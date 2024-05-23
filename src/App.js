import './App.css';
import CarouselEffect from './Components/Carousel/CarouselEffect';
import Category from './Components/Category/Category';
import Header from './Components/Header/Header';
import Product from './Components/Product/Product';

function App() {
  return (
    <div>
        <Header/>
        <CarouselEffect/>
        <Category/>
        <Product/>
    </div>
  );
}

export default App;
