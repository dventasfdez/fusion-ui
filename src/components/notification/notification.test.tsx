import React, {useState} from 'react';
import '@testing-library/jest-dom/extend-expect';
import {Notification} from './notification';
import NBody from './notificationBody';
import NFooter from './notificationFooter';
import NHeader from './notificationHeader';
import {act, fireEvent, render, waitFor} from '@testing-library/react';
jest.setTimeout(30000);

const NotificationSnap = (props?: any) => {
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <div id="root">
      <button data-testid="show-notification" onClick={() => setOpenNotification(true)}></button>
      <Notification
        data-testid="notification"
        className=.stepone-ui"
        show={openNotification}
        renderAsPortal={props?.renderAsPortal}
        setShow={props?.setShow}
      >
        <NHeader>This is a Notification</NHeader>
        <NBody>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloribus officiis architecto</NBody>
        <NFooter>
          <button data-testid="close-notification" onClick={() => setOpenNotification(false)}>
            Close Button
          </button>
        </NFooter>
      </Notification>
    </div>
  );
};

const NotificationExample = (props: any) => (
  <Notification data-testid="notification" show {...props}>
    <NHeader>This is a Notification</NHeader>
    <NBody>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloribus officiis architecto</NBody>
    <NFooter>
      <a href="#" target="_self">
        Link 1
      </a>
    </NFooter>
  </Notification>
);

const NotificationExampleDouble = (props: any) => (
  <Notification data-testid="notification" show {...props}>
    <NHeader>This is a Notification</NHeader>
    <NBody>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloribus officiis architecto</NBody>
    <NFooter>
      <a href="#" target="_self">
        Link 1
      </a>
      <a href="#" target="_self">
        Link 2
      </a>
    </NFooter>
  </Notification>
);

const InlineNotification = (props: any) => (
  <Notification data-testid="notification" show {...props}>
    <NHeader>This is a Notification</NHeader>
    <NFooter>
      <a href="#" target="_self">
        Link 1
      </a>
      <a href="#" target="_self">
        Link 2
      </a>
    </NFooter>
  </Notification>
);

const InlineNotificationLink = (props: any) => (
  <Notification data-testid="notification" show {...props}>
    <NHeader>This is a Notification</NHeader>
    <NFooter>
      <a href="#" target="_self">
        Link 1
      </a>
    </NFooter>
  </Notification>
);

const StateFullNotification = (props: any) => {
  const [show, setShow] = useState(props.show);

  const handleSetShow = () => {
    if (props.setShow) {
      setShow(false);
    }
    if (props.noSetShow) {
      return 'string';
    }
  };
  return (
    <Notification
      data-testid="notification"
      onClose={() => (!props.onClose ? setShow(false) : null)}
      show={show}
      setShow={handleSetShow}
      renderAsPortal={props?.renderAsPortal}
    >
      <NHeader>This is a Notification</NHeader>
      <NBody>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloribus officiis architecto</NBody>
      <NFooter>
        <a href="#" target="_self">
          Link 1
        </a>
        <a href="#" target="_self">
          Link 2
        </a>
      </NFooter>
    </Notification>
  );
};

test('render Notification and not close ', async () => {
  const {getByTestId, queryAllByTestId} = render(<NotificationSnap renderAsPortal notSetShow />);
  const notificationButton = getByTestId('show-notification');
  if (notificationButton) fireEvent.click(notificationButton);
  expect(queryAllByTestId('notification')).toHaveLength(1);

  expect(queryAllByTestId('notification')).toHaveLength(1);
}, 7000);

test('render Notification', () => {
  const {container, getByTestId} = render(<NotificationSnap />);
  const notificationButton = getByTestId('show-notification');
  if (notificationButton) fireEvent.click(notificationButton);
  expect(getByTestId('notification')).toBeDefined();
  const closeNotification = getByTestId('close-notification');
  if (closeNotification) fireEvent.click(closeNotification);
  expect(container.getElementsByClassName('notification').length).toBe(0);
});

describe('renders double link notification', () => {
  test('on default notification', () => {
    const {getByText} = render(<NotificationExampleDouble />);

    expect(getByText(/Link 1/i)).toBeInTheDocument();
    expect(getByText(/Link 2/i)).toBeInTheDocument();
  });
  test('on inline notification', () => {
    const {getByText} = render(<InlineNotification />);
    expect(getByText(/Link 1/i)).toBeInTheDocument();
    expect(getByText(/Link 2/i)).toBeInTheDocument();
  });
});

describe('renders one link notification', () => {
  test('on default notification', () => {
    const {queryByText, getByText} = render(<NotificationExample />);

    expect(getByText(/Link 1/i)).toBeInTheDocument();
    expect(queryByText(/Link 2/i)).toBeNull();
  });
  test('on inline notification', () => {
    const {getByText, queryByText} = render(<InlineNotificationLink />);
    expect(getByText(/Link 1/i)).toBeInTheDocument();
    expect(queryByText(/Link 2/i)).toBeNull();
  });
});

describe('renders all states on default notification', () => {
  test('render success', () => {
    const {getByTestId} = render(<NotificationExample success />);
    const side = getByTestId('notification');
    expect(side).toHaveClass('notification_success');
  });

  test('render error', () => {
    const {getByTestId} = render(<NotificationExample error />);
    const side = getByTestId('notification');
    expect(side).toHaveClass('notification_error');
  });

  test('render warning', () => {
    const {getByTestId} = render(<NotificationExample warning />);
    const side = getByTestId('notification');
    expect(side).toHaveClass('notification_warning');
  });

  test('render info', () => {
    const {getByTestId} = render(<NotificationExample info />);
    const side = getByTestId('notification');
    expect(side).toHaveClass('notification_info');
  });

  test('render read', () => {
    const {getByTestId} = render(<NotificationExample read />);
    const side = getByTestId('notification');
    expect(side).toHaveClass('notification_read');
  });
  test('render with onclose', () => {
    const {getByTestId} = render(<StateFullNotification onClose show />);
    const close = getByTestId('notification-close-test');
    fireEvent.click(close);
    expect(() => getByTestId('notification')).not.toThrow();
  });
  test('render with icon', () => {
    const {container} = render(<NotificationExample icon="icon-activity" />);
    const icon = container.querySelector('.notification-icon');
    expect(icon).toBeDefined();
  });
});

describe('Notification on Portal', () => {
  it('onChange show with renderasPortal', async () => {
    jest.useFakeTimers();
    jest.runAllTimers();
    const {rerender, container} = render(<StateFullNotification renderAsPortal show={false} />);
    rerender(<StateFullNotification renderAsPortal show />);
    setTimeout(() => {
      expect(container.querySelector('.notification')).toBeDefined();
    }, 5000);
    jest.runAllTimers();
  });
});
