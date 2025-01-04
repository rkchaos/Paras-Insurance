import { useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom';
import { tailChase } from 'ldrs';
// importing pages
import Home from './pages/Home.page';
import AboutUs from './pages/AboutUs.page';
import ContactUs from './pages/ContactUs.page';
import Authentication from './pages/Authentication.page';
import InsuranceForm from './pages/InsuranceForm.page';
import ClientProfile from './pages/ClientProfile.page';
import ResetPassword from './pages/ResetPassword.page';
import PageNotFound from './pages/PageNotFound.page';
// importing utils
import useFetchClient from './utils/useFetchClient';
import GuestRoute from './utils/GuestRoute';
// importing contexts
import { SnackBarContext } from './contexts/SnackBar.context';
import { ConfirmationDialogContext } from './contexts/ConfirmationDialog.context';
// importing components
import Header from './components/Header';
import Footer from './components/Footer';
import SnackBar from './components/subcomponents/SnackBar';
import ConfirmationDialog from './components/subcomponents/ConfirmationDialog';

const App = () => {
    const { loading, condenseClientInfo } = useFetchClient();
    tailChase.register();

    const { snackbarValue, snackbarState, handleSnackbarState } = useContext(SnackBarContext);
    const { dialog, dialogValue, closeDialog, linearProgressBar, handleDialog } = useContext(ConfirmationDialogContext)

    if (loading) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <l-tail-chase size='40' speed='1.75' color='#111827' />
            </div>
        );
    }

    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path='/' exact
                    element={<Home />}
                />
                <Route
                    path='/aboutUs'
                    element={<><AboutUs /><Footer /></>}
                />
                <Route
                    path='/contactUs'
                    element={<><ContactUs /><Footer /></>}
                />
                <Route
                    path='/auth'
                    element={<GuestRoute Component={Authentication} user={condenseClientInfo} />}
                />
                <Route
                    path='/insuranceForm'
                    element={<><InsuranceForm /><Footer /></>}
                />
                <Route
                    path='/profile/:id'
                    element={<><ClientProfile /><Footer /></>}
                />
                <Route
                    path='/resetPassword/:resetToken'
                    element={<><ResetPassword /><Footer /></>}
                />
                <Route
                    path="*"
                    element={<><PageNotFound /><Footer /></>} />
            </Routes>
            <SnackBar
                openSnackbar={snackbarState} handleClose={handleSnackbarState} timeOut={5000}
                message={snackbarValue.message} type={snackbarValue.status}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
            />
            <SnackBar
                openSnackbar={snackbarState} handleClose={handleSnackbarState} timeOut={2500}
                message={snackbarValue.message} type={snackbarValue.status}
                vertical='top' horizontal='left'
                sx={{ display: { xs: 'flex', sm: 'none' } }}
            />
            <ConfirmationDialog dialog={dialog} closeDialog={closeDialog} handleDialog={handleDialog} linearProgressBar={linearProgressBar} dialogValue={dialogValue} />
        </Router>
    );
}

export default App;
