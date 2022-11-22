import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './RoutesApp';

type uiType = React.ReactElement<any, string | React.JSXElementConstructor<any>>

const renderWithRouter = (ui: uiType, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: BrowserRouter }),
    }
}

describe('Login component test', () => {

    it('Should render home route', () => {
        renderWithRouter(<RoutesApp />)

        expect(screen.getByTestId('mainMovieSelectionContainer')).toBeTruthy()
    })

    it('Should render profile route', () => {
        renderWithRouter(<RoutesApp />, { route: '/profile' })

        expect(screen.getByTestId('profileContainer')).toBeTruthy()
    })

    it('Should render play route', () => {
        renderWithRouter(<RoutesApp />, { route: '/play/idtest' })

        expect(screen.getByTestId('playContainer')).toBeTruthy()
    })
})