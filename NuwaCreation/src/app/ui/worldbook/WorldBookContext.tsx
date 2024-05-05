'use client';

import { createContext, useContext, useReducer } from 'react';
import { TypeWorldBookItem } from '@/app/lib/definitions';
import { getWorldBookList, pushWorldBookList } from '@/app/lib/utils';

export const WorldBookContext = createContext<TypeWorldBookItem>(null as any);
export const WorldBookDispatchContext = createContext(null as any);

export function WorldBookProvider({ children, value }: {children: React.ReactNode, value: TypeWorldBookItem}) {
  const [charaListItem, dispatch] = useReducer(
    charaListItemReducer,
    value as never
  );

  return (
    <WorldBookContext.Provider value={charaListItem as any}>
      <WorldBookDispatchContext.Provider value={dispatch as any}>
        {children}
      </WorldBookDispatchContext.Provider>
    </WorldBookContext.Provider>
  );
}

export function useWorldBookItem() {
  return useContext(WorldBookContext);
}

export function useWorldBookItemDispatch() {
  return useContext(WorldBookDispatchContext);
}

function charaListItemReducer(value: TypeWorldBookItem, action: any) {
  switch (action.type) {
    case 'changed': {
      const charaList = getWorldBookList();
      const newWorldBookList = charaList.map((t) => {
        if (t.uid === action.payload.uid) {
          return action.payload;
        } else {
          return t;
        }
      });
      pushWorldBookList(newWorldBookList)
      return action.payload
    }
    case 'deleted': {
      const charaList = getWorldBookList();
      return charaList.filter((t) => t.uid !== action.payload.uid);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

