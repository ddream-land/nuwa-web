'use client';

import { createContext, useContext, useReducer } from 'react';
import AlterMessages from './AlterMessages';
import { useImmerReducer } from 'use-immer';

export const AlterContext = createContext([]);
export const AlterDispatchContext = createContext(null as any);

export function AlterContextProvider({ children }: {children: React.ReactNode}) {
  const [messages, dispatch] = useImmerReducer(
    alterReducer,
    []
  );

  return (
    <AlterContext.Provider value={messages}>
      <AlterDispatchContext.Provider value={dispatch}>
        <AlterMessages messages={messages} onClose={() => {
          dispatch({
            type: "clear"
          })
        }} />
        {children}
      </AlterDispatchContext.Provider>
    </AlterContext.Provider>
  );
}

export function useAlter() {
  return useContext(AlterContext);
}

export function useAlterDispatch() {
  return useContext(AlterDispatchContext);
}

function alterReducer(draft: string[], action: any) {
  switch (action.type) {
    case 'add': {
      const isHas = draft.find((item) => (item === action.payload));
      !isHas && draft.push(action.payload);
      break;
    }
    case 'clear': {
      return [];
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

