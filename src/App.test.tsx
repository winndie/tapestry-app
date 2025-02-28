import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './state';
import { Weekdays } from './types';

describe('App Component', () => {
    test('renders weekdays containers', () => {
        render(<Provider store={store}><App /></Provider>);
        Object.keys(Weekdays).forEach(async day => {
            const weekday = screen.getByTestId(`${day}-Form`);
            expect(weekday).toBeInTheDocument();
            expect(weekday).toHaveTextContent(Weekdays[day as keyof typeof Weekdays])
            const checkBox = screen.getByTestId(`${day}-isOpen`);
            expect(checkBox).toBeInTheDocument();

            fireEvent.click(checkBox);

            await waitFor(() => {
                const openTime = screen.getByTestId(`${day}-openTime`);
                expect(openTime).toBeInTheDocument();

                const closeTime = screen.getByTestId(`${day}-closeTime`);
                expect(closeTime).toBeInTheDocument();
            });
        });
    });
});
