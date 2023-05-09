import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import EmptyState, {EmptyStateTitle, EmptyStateDescription, EmptyStateImg} from './emptyState';

const ESTest: React.FC<any> = () => (
  <EmptyState>
    <EmptyStateImg src="https://picsum.photos/150" />
    <EmptyStateTitle>Something is wrong </EmptyStateTitle>
    <EmptyStateDescription>
      We are unable to connect to the service. Click on Retry to try again or View Log to learn more the issue{' '}
    </EmptyStateDescription>
    <button>retry</button>
    <a>View Log</a>
  </EmptyState>
);

test('Component renders and match snapshot', () => {
  const component = renderer.create(<ESTest />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
