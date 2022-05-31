import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Navbar from '../components/Navbar/Navbar';

test('navbar', () => {
    render(<Navbar />);
});
