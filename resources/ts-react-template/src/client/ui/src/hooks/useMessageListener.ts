import { useCallback, useEffect, useRef } from 'react';

export function useMessageListener<T>(type: string, handler: (data: T) => void) {
  const inputHandler = useRef<(data: T) => void>(() => undefined);

  useEffect(() => {
    inputHandler.current = handler;
  }, [handler]);

  const dataHandler = useCallback(
    (event: MessageEvent) => {
      if (!event.data || event.data.type !== type || !inputHandler) {
        return;
      }

      const data = event.data.data;

      if (!data) {
        return;
      }

      inputHandler.current(data);
    },
    [inputHandler, type]
  );

  useEffect(() => {
    window.addEventListener('message', dataHandler);

    return () => {
      window.removeEventListener('message', dataHandler);
    };
  }, [type]);
}
