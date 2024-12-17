import { Container } from "react-bootstrap";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import Footer from "./components/Footer.tsx";


const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
