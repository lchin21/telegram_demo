import React, {ReactNode} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';


interface ModalProps {
  children: ReactNode;
  title: string;
  customButton?: ReactNode;
}

export function Modal({ children, title, customButton }: ModalProps): React.JSX.Element {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button home" title={title}>{title}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent" style={{width: '100vw', height: '100vh', maxHeight: '100%', maxWidth: '100%'}}>
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description className="DialogDescription justify-center">
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: "center" }}>
              {children}
            </div>
          </Dialog.Description>

          {customButton && (
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'center'}}>
              <Dialog.Close asChild>
                <div>
                  {customButton}
                </div>
              </Dialog.Close>
            </div>
          )}

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
