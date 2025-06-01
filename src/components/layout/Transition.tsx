import { Fragment, ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface TransitionProps {
  show?: boolean;
  as?: React.ElementType;
  children: ReactNode;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  static?: boolean;
}

interface TransitionChildProps {
  as?: React.ElementType;
  children: ReactNode;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

interface DialogProps {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  onClose: () => void;
  static?: boolean;
}

interface DialogOverlayProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const TransitionContext = createContext<{ parent: { show: boolean } }>({
  parent: { show: false },
});

function Transition({
  show = true,
  as: Component = 'div',
  children,
  ...props
}: TransitionProps) {
  return (
    <TransitionContext.Provider value={{ parent: { show } }}>
      <Component {...props}>{children}</Component>
    </TransitionContext.Provider>
  );
}

function Child({
  as: Component = 'div',
  children,
  ...props
}: TransitionChildProps) {
  const { parent } = useContext(TransitionContext);
  return <Component {...props}>{children}</Component>;
}

function Dialog({ 
  as: Component = 'div', 
  children,
  onClose,
  ...props 
}: DialogProps) {
  return <Component role="dialog" {...props}>{children}</Component>;
}

function DialogOverlay({ className, onClick, ...props }: DialogOverlayProps) {
  return <div className={className} onClick={onClick} {...props} />;
}

Dialog.Overlay = DialogOverlay;

const Root = Transition;
Transition.Root = Root;
Transition.Child = Child;

export { Transition, Dialog };