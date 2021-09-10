import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Recipes from './components/Recipes/Recipe';
// import Memories from './components/AllMemories/AllMemories';
import RecipeView from './components/OneRecipe/OneRecipe';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/Profile/User';
// import Modal from './components/Modal/Modal';
// import EditRecipeForm from './components/EditRecipe/EditRecipe';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Footer from './components/Footer/Footer';
// import SearchPage from './components/SearchPage/SearchPage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  // const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar/>
      {/* <button onClick={() => setShow(true)}>Show Modal</button>
      <Modal title="My Modal" onClose={() => setShow(false)} onSubmit={() => setShow(false)} show={show}>
        <p>Sign Up</p>
      </Modal> */}
      {/* <SearchPage /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/share-recipe' exact={true} >
          <CreateRecipe />
          {/* <EditRecipeForm /> */}
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {/* <h1 className="recipes-main-text">Recipes</h1> */}
          <Recipes />
        </Route>
        {/* <Route path='/memories' exact={true}>
          <Memories />
        </Route> */}
        <Route path='/recipes/:recipeId' exact={true}>
          <RecipeView/>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
